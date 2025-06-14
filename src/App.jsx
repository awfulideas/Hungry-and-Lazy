import React, { useState, useEffect } from 'react';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { MainScreen } from './screens/MainScreen';
import { SavedListScreen } from './screens/SavedListScreen';
import { MOCK_RESTAURANTS } from './data/mockData';
import { styles } from './styles/styles';

export default function App() {
  const [appState, setAppState] = useState('profileSetup');
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

  useEffect(() => {
    if (appState === 'main') {
      const filtered = MOCK_RESTAURANTS.filter(r => {
        const priceLength = r.price.length;
        const cuisineMatch = profile.cuisines.length === 0 || profile.cuisines.includes(r.cuisine);
        const priceMatch = priceLength >= profile.minPrice && priceLength <= profile.maxPrice;

        // The 'eatingTime' filter is stored, but not yet used.
        // A real app would use this to check if a restaurant is currently open.
        return !disliked.includes(r.id) &&
          r.distance <= profile.distance &&
          cuisineMatch &&
          priceMatch;
      });
      setRestaurants(filtered);
    }
  }, [appState, profile, disliked]);

  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
    setAppState('main'); // Go directly to main screen now
  };
  
  const handleAction = (id, action) => {
    const currentRestaurant = restaurants.find(r => r.id === id);
    if (!currentRestaurant) return;

    switch (action) {
      case 'LIKE':
        const url = `https://www.google.com/maps/search/?api=1&query=${currentRestaurant.coords.latitude},${currentRestaurant.coords.longitude}`;
        window.open(url, '_blank');
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
  };

  const renderContent = () => {
    switch (appState) {
      case 'profileSetup':
        return <ProfileSetupScreen onSave={handleProfileSave} currentProfile={profile} />;
      case 'main':
        return <MainScreen 
                  restaurants={restaurants} 
                  onAction={handleAction} 
                  onShowSaved={() => setAppState('savedList')} 
                  onShowProfile={() => setAppState('profileSetup')}
               />;
      case 'savedList':
        return <SavedListScreen savedItems={saved} onBack={() => setAppState('main')} onNavigate={(coords) => {
            const url = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
            window.open(url, '_blank');
        }} />;
      default:
        return <ProfileSetupScreen onSave={handleProfileSave} currentProfile={profile} />;
    }
  };

  return (
    <div style={styles.container}>
      {renderContent()}
    </div>
  );
}