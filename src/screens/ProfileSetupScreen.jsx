import React, { useState } from 'react';
import { User } from 'lucide-react';
import { styles } from '../styles/styles';
import { PriceRangeSlider } from '../components/PriceRangeSlider';

export const ProfileSetupScreen = ({ onSave, currentProfile }) => {
    const [profile, setProfile] = useState(currentProfile);
    const updateProfile = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));

    const handleCuisineToggle = (cuisine) => {
        const newCuisines = [...profile.cuisines];
        const index = newCuisines.indexOf(cuisine);
        if (index > -1) {
            newCuisines.splice(index, 1);
        } else {
            newCuisines.push(cuisine);
        }
        updateProfile('cuisines', newCuisines);
    };

    return (
        <div style={styles.profileContainer}>
            <div style={styles.profileHeader}>
                <User color="#333" size={32} />
                <h1 style={styles.profileTitle}>Your Food Profile</h1>
            </div>
            <p style={styles.profileSubtitle}>Set your preferences to get the best recommendations.</p>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Dietary Restrictions</label>
                <div style={styles.optionContainer}>
                    {['None', 'Vegetarian', 'Vegan', 'Gluten-Free'].map(item => (
                        <button 
                            key={item} 
                            style={profile.diet === item ? styles.optionButtonSelected : styles.optionButton} 
                            onClick={() => updateProfile('diet', item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Cuisines</label>
                <p style={styles.profileSublabel}>Select one or more. Leave blank for any.</p>
                <div style={styles.optionContainer}>
                    {['Italian', 'Mexican', 'Japanese', 'American', 'Chinese', 'Indian', 'Thai', 'Vietnamese', 'French', 'Mediterranean', 'Korean'].map(item => (
                        <button 
                            key={item} 
                            style={profile.cuisines.includes(item) ? styles.optionButtonSelected : styles.optionButton} 
                            onClick={() => handleCuisineToggle(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Max Distance</label>
                <div style={styles.optionContainer}>
                   {[1, 5, 10, 20].map(val => (
                       <button 
                           key={val} 
                           style={profile.distance === val ? styles.optionButtonSelected : styles.optionButton} 
                           onClick={() => updateProfile('distance', val)}
                       >
                           {val} km
                       </button>
                   ))}
                </div>
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Price Range</label>
                <div style={styles.sliderWrapper}>
                    <PriceRangeSlider 
                        min={profile.minPrice}
                        max={profile.maxPrice}
                        onMinChange={(val) => setProfile(p => ({...p, minPrice: val}))}
                        onMaxChange={(val) => setProfile(p => ({...p, maxPrice: val}))}
                    />
                </div>
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>When do you want to eat?</label>
                <div style={styles.optionContainer}>
                    <button 
                        style={profile.eatingTime === 'NOW' ? styles.optionButtonSelected : styles.optionButton} 
                        onClick={() => updateProfile('eatingTime', 'NOW')}
                    >
                        RIGHT NOW
                    </button>
                    <button 
                        style={profile.eatingTime === 'LATER' ? styles.optionButtonSelected : styles.optionButton} 
                        onClick={() => updateProfile('eatingTime', 'LATER')}
                    >
                        LATER
                    </button>
                </div>
            </div>
            
            <button style={styles.saveButton} onClick={() => onSave(profile)}>
                Save & Find Food
            </button>
        </div>
    );
};