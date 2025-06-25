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
    distance: 5,
    minPrice: 1,
    maxPrice: 4,
    eatingTime: 'NOW' // Added this new state
  });
  const [restaurants, setRestaurants] = useState([]);
  const [saved, setSaved] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMoreRestaurants, setHasMoreRestaurants] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

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
      setIsInitialLoading(true);
      const userLocation = await getCurrentLocation();

      const pageToken = loadMore ? nextPageToken : null;
      const result = await getNearbyRestaurants(userLocation, {
        distance: profile.distance,
        cuisine: profile.cuisines[0],
      }, pageToken);

      if (loadMore) {
        // Append new restaurants to existing ones
        setRestaurants(prev => [...prev, ...result.restaurants]);
      } else {
        // Replace with new restaurants
        setRestaurants(result.restaurants);
      }

      setNextPageToken(result.nextPageToken);
      setHasMoreRestaurants(result.hasMore);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      setRestaurants(MOCK_RESTAURANTS); // Fallback
    } finally {
      setIsInitialLoading(false);
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
    if (!hasMoreRestaurants || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const userLocation = await getCurrentLocation();

      const result = await getNearbyRestaurants(userLocation, {
        distance: profile.distance,
        cuisine: profile.cuisines[0],
      }, nextPageToken);

      // Append new restaurants
      setRestaurants(prev => [...prev, ...result.restaurants]);
      setNextPageToken(result.nextPageToken);
      setHasMoreRestaurants(result.hasMore);
    } catch (error) {
      console.error('Error loading more restaurants:', error);
      // Could show error state here
    } finally {
      setIsLoadingMore(false);
    }
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