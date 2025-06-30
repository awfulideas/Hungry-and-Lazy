import React, { useState, useEffect } from 'react';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { MainScreen } from './screens/MainScreen';
import { SavedListScreen } from './screens/SavedListScreen';
import { MOCK_RESTAURANTS } from './data/mockData';
import { LandingScreen } from './screens/LandingScreen';
import { styles } from './styles/styles';
import { getNearbyRestaurants, getCurrentLocation } from './services/restaurantService';
import { openGoogleMaps } from './utils/openGoogleMaps';

export default function App() {
  const [appState, setAppState] = useState('landing');
  const [isHungryNow, setIsHungryNow] = useState(false);
  const [profile, setProfile] = useState({
    diet: 'None',
    cuisines: [],
    excludedCuisines: [],
    establishmentType: 'Restaurant', 
    distance: 5,
    minPrice: 1,
    maxPrice: 4,
    eatingTime: 'NOW'
  });
  const [restaurants, setRestaurants] = useState([]);
  const [saved, setSaved] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMoreRestaurants, setHasMoreRestaurants] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [cuisinePaginationState, setCuisinePaginationState] = useState({});

  useEffect(() => {
    if (restaurants.length !== 0) {
      loadNearbyRestaurants(false);
    }
  }, [profile]);

  useEffect(() => {
    if (appState === 'main' && restaurants.length === 0 && !isLoadingMore) {
      loadNearbyRestaurants(false);
    }
  }, [appState]);

  const loadNearbyRestaurants = async (loadMore = false) => {
    try {
      setIsInitialLoading(!loadMore);
      if (loadMore) setIsLoadingMore(true);

      const userLocation = await getCurrentLocation();

      let allRestaurants = [];
      let hasAnyMore = false;
      let newNextPageToken = null;

      // Single or no cuisine - simple pagination
      if (profile.cuisines.length <= 1) {
        const result = await getNearbyRestaurants(userLocation, {
          distance: profile.distance,
          cuisines: profile.cuisines.length <= 1 ? profile.cuisines : [profile.cuisines[0]],
          excludedCuisines: profile.excludedCuisines || [],
          establishmentType: profile.establishmentType, 
        }, loadMore ? nextPageToken : null);

        allRestaurants = result.restaurants;
        newNextPageToken = result.nextPageToken;
        hasAnyMore = result.hasMore;
      }
      // Multiple cuisines - parallel API calls
      else {
        const newPaginationState = { ...cuisinePaginationState };

        const restaurantPromises = profile.cuisines.map(async (cuisine) => {
          // Skip this cuisine if it has no more results
          if (loadMore && newPaginationState[cuisine]?.hasMore === false) {
            return { restaurants: [], nextPageToken: null, hasMore: false };
          }

          const pageToken = loadMore ? newPaginationState[cuisine]?.nextPageToken : null;

          try {
            const result = await getNearbyRestaurants(userLocation, {
              distance: profile.distance,
              cuisines: [cuisine], // Single cuisine for this iteration
              excludedCuisines: profile.excludedCuisines || [],
              establishmentType: profile.establishmentType, 
            }, pageToken);

            // Update pagination state for this cuisine
            newPaginationState[cuisine] = {
              nextPageToken: result.nextPageToken,
              hasMore: result.hasMore
            };

            if (result.hasMore) hasAnyMore = true;

            return result;
          } catch (error) {
            console.error(`Error loading ${cuisine} restaurants:`, error);
            return { restaurants: [], nextPageToken: null, hasMore: false };
          }
        });

        const results = await Promise.all(restaurantPromises);

        // Update pagination state
        setCuisinePaginationState(newPaginationState);

        // Merge results
        results.forEach(result => {
          allRestaurants.push(...result.restaurants);
        });

        // Sort by rating and distance for better quality
        allRestaurants.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (Math.abs(ratingDiff) > 0.3) return ratingDiff;
          return a.distance - b.distance;
        });
      }

      // Remove duplicates (same restaurant might appear in multiple cuisine searches)
      const seenIds = new Set(loadMore ? restaurants.map(r => r.id) : []);
      const uniqueRestaurants = [];

      allRestaurants.forEach(restaurant => {
        if (!seenIds.has(restaurant.id)) {
          seenIds.add(restaurant.id);
          uniqueRestaurants.push(restaurant);
        }
      });

      // Update restaurants
      if (loadMore) {
        setRestaurants(prev => [...prev, ...uniqueRestaurants]);
      } else {
        setRestaurants(uniqueRestaurants);
        // Reset pagination state on new search for multiple cuisines
        if (profile.cuisines.length > 1) {
          setCuisinePaginationState({});
        }
      }

      // Update pagination state
      setNextPageToken(newNextPageToken);
      setHasMoreRestaurants(hasAnyMore);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      setRestaurants(MOCK_RESTAURANTS); // Fallback
      setHasMoreRestaurants(false);
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleHungryNow = () => {
    setIsHungryNow(true);
    setProfile(prev => ({ ...prev, distance: 1, eatingTime: 'NOW' })); // Set distance to 1 mile
    setAppState('profileSetup');
  };

  const handleLater = () => {
    setIsHungryNow(false);
    setProfile(prev => ({ ...prev, eatingTime: 'LATER' }));
    setAppState('profileSetup');
  };

  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
    setAppState('main'); // Go directly to main screen now
  };

  const handleAction = async (id, action) => {
    const currentRestaurant = restaurants.find(r => r.id === id);
    if (!currentRestaurant) return;

    switch (action) {
      case 'LIKE':
        openGoogleMaps(currentRestaurant)
        setRestaurants(prev => prev.filter(r => r.id !== id));
        break;
      case 'SAVE':
        if (!saved.some(r => r.id === id)) {
          setSaved(prev => [currentRestaurant, ...prev]);
        }
        setRestaurants(prev => prev.filter(r => r.id !== id));
        break;
      case 'DISLIKE':
        setDisliked(prev => [...prev, id]);
        setRestaurants(prev => prev.filter(r => r.id !== id));
        break;
    }

    // Check if this was the last restaurant
    const remainingRestaurants = restaurants.filter(r => r.id !== id);

    if (remainingRestaurants.length === 0 && hasMoreRestaurants && !isLoadingMore) {
      // No restaurants left - load more with loading screen
      await loadMoreRestaurants();
    }
  };

  const loadMoreRestaurants = async () => {
    if (!hasMoreRestaurants || isLoadingMore) {
      console.log('Cannot load more: hasMore =', hasMoreRestaurants, 'isLoading =', isLoadingMore);
      return;
    }

    console.log('Loading more restaurants...');
    await loadNearbyRestaurants(true);
  };

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingScreen onHungryNow={handleHungryNow} onLater={handleLater} />;
      case 'profileSetup':
        return <ProfileSetupScreen
          onSave={handleProfileSave}
          currentProfile={profile}
          hideDistance={isHungryNow}
          onBack={() => setAppState('landing')}
        />;
      case 'main':
        return <MainScreen
          restaurants={restaurants}
          onAction={handleAction}
          onShowSaved={() => setAppState('savedList')}
          onShowProfile={() => setAppState('profileSetup')}
          isInitialLoading={isInitialLoading}
          isLoadingMore={isLoadingMore}
          hasMoreRestaurants={hasMoreRestaurants}
          openGoogleMaps={openGoogleMaps}
        />;
      case 'savedList':
        return <SavedListScreen savedItems={saved}
          onBack={() => setAppState('main')}
          onNavigate={openGoogleMaps}
        />;
      default:
        return <LandingScreen onHungryNow={handleHungryNow} onLater={handleLater} />;
    }
  };

  return (
    <div style={styles.container}>
      {renderContent()}
    </div>
  );
}