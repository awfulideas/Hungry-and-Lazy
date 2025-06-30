import React, { useState } from 'react';
import { User, ChevronLeft } from 'lucide-react';
import { styles } from '../styles/styles';
import { PriceRangeSlider } from '../components/PriceRangeSlider';

export const ProfileSetupScreen = ({ onSave, currentProfile, hideDistance = false, onBack }) => {
    const [profile, setProfile] = useState(currentProfile);
    const [saveButtonHovered, setSaveButtonHovered] = useState(false);

    const updateProfile = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));

    const handleCuisineClick = (cuisine) => {
        if (profile.excludedCuisines?.includes(cuisine)) {
            // Currently excluded -> reset to neutral
            setProfile(prev => ({
                ...prev,
                excludedCuisines: prev.excludedCuisines.filter(c => c !== cuisine)
            }));
        } else if (profile.cuisines.includes(cuisine)) {
            // Currently included -> exclude
            setProfile(prev => ({
                ...prev,
                cuisines: prev.cuisines.filter(c => c !== cuisine),
                excludedCuisines: [...(prev.excludedCuisines || []), cuisine]
            }));
        } else {
            // Currently neutral -> include
            setProfile(prev => ({
                ...prev,
                cuisines: [...prev.cuisines, cuisine]
            }));
        }
    };

    const getCuisineButtonStyle = (cuisine) => {
        if (profile.excludedCuisines?.includes(cuisine)) {
            return styles.profileCuisineButtonExcluded;
        }
        if (profile.cuisines.includes(cuisine)) {
            return styles.profileCuisineButtonSelected;
        }
        return styles.profileCuisineButton;
    };

    const getCuisineButtonText = (cuisine) => {
        if (profile.excludedCuisines?.includes(cuisine)) {
            return `✕ ${cuisine}`;
        }
        if (profile.cuisines.includes(cuisine)) {
            return `✓ ${cuisine}`;
        }
        return cuisine;
    };

    const handleEstablishmentTypeChange = (newType) => {
        if (newType !== 'Restaurant') {
            // Clear cuisines when switching away from Restaurant
            setProfile(prev => ({
                ...prev,
                establishmentType: newType,
                cuisines: [],
                excludedCuisines: []
            }));
        } else {
            setProfile(prev => ({ ...prev, establishmentType: newType }));
        }
    };

    return (
        <div style={styles.profileContainer}>
            {/* Back button - separate and positioned top left */}
            <button
                style={styles.profileBackButtonTopLeft}
                onClick={onBack}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                <ChevronLeft size={24} color="#333" />
            </button>

            {/* Header - centered title and subtitle */}
            <div style={styles.profileHeaderCentered}>
                <div style={styles.profileTitleContainer}>
                    <User color="#ff6b6b" size={28} />
                    <h1 style={styles.profileTitleNew}>Food Profile</h1>
                </div>
                <p style={styles.profileSubtitle}>Set your preferences for the best recommendations</p>
            </div>

            <div style={styles.profileContent}>
                {/* Dietary Restrictions */}
                <div style={styles.profileSection}>
                    <h3 style={styles.profileSectionTitle}>Dietary Restrictions</h3>
                    <div style={styles.profileOptionGrid}>
                        {['None', 'Vegetarian', 'Vegan', 'Gluten-Free'].map(item => (
                            <button
                                key={item}
                                style={profile.diet === item ? styles.profileOptionButtonSelectedNew : styles.profileOptionButtonNew}
                                onClick={() => updateProfile('diet', item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Establishment Type */}
                <div style={styles.profileSection}>
                    <h3 style={styles.profileSectionTitle}>Establishment Type</h3>
                    <p style={styles.profileSublabel}>What type of place are you looking for?</p>
                    <div style={styles.profileOptionGrid}>
                        {['Restaurant', 'Bar', 'Cafe', 'Desserts'].map(item => (
                            <button
                                key={item}
                                style={profile.establishmentType === item ? styles.profileOptionButtonSelectedNew : styles.profileOptionButtonNew}
                                onClick={() => handleEstablishmentTypeChange(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cuisines - only for restaurants */}
                {profile.establishmentType === 'Restaurant' && (
                    <div style={styles.profileSection}>
                        <h3 style={styles.profileSectionTitle}>Cuisines</h3>
                        <p style={styles.profileSublabel}>Click to include, click again to exclude, once more to reset</p>
                        <div style={styles.profileCuisineGrid}>
                            {['Italian', 'Mexican', 'Japanese', 'American', 'Chinese', 'Indian', 'Thai', 'Vietnamese', 'French', 'Mediterranean', 'Korean'].map(item => (
                                <button
                                    key={item}
                                    style={getCuisineButtonStyle(item)}
                                    onClick={() => handleCuisineClick(item)}
                                >
                                    {getCuisineButtonText(item)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Distance - only if not hidden */}
                {!hideDistance && (
                    <div style={styles.profileSection}>
                        <h3 style={styles.profileSectionTitle}>Max Distance</h3>
                        <div style={styles.profileOptionGrid}>
                            {[1, 5, 10, 20].map(val => (
                                <button
                                    key={val}
                                    style={profile.distance === val ? styles.profileOptionButtonSelectedNew : styles.profileOptionButtonNew}
                                    onClick={() => updateProfile('distance', val)}
                                >
                                    {val} km
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Range */}
                <div style={styles.profileSection}>
                    <h3 style={styles.profileSectionTitle}>Price Range</h3>
                    <div style={styles.sliderWrapper}>
                        <PriceRangeSlider
                            min={profile.minPrice}
                            max={profile.maxPrice}
                            onMinChange={(val) => setProfile(p => ({ ...p, minPrice: val }))}
                            onMaxChange={(val) => setProfile(p => ({ ...p, maxPrice: val }))}
                        />
                    </div>
                </div>
            </div>

            <button
                style={{
                    ...styles.profileSaveButtonNew,
                    ...(saveButtonHovered ? {
                        background: 'linear-gradient(135deg, #ff5252 0%, #ff7979 100%)',
                        boxShadow: '0 12px 35px rgba(255, 107, 107, 0.6)',
                        transform: 'translateY(-2px)'
                    } : {})
                }}
                onClick={() => onSave(profile)}
                onMouseEnter={() => setSaveButtonHovered(true)}
                onMouseLeave={() => setSaveButtonHovered(false)}
            >
                {hideDistance ? 'Find Food Now!' : 'Save & Find Food'}
            </button>
        </div>
    );
};