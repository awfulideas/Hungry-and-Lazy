import React, { useState } from 'react';
import { Heart, ChevronLeft, Star, MapPin } from 'lucide-react';
import { styles } from '../styles/styles';

export const SavedListScreen = ({ savedItems, onBack, onNavigate }) => {
    const [backButtonHovered, setBackButtonHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <div style={styles.savedScreenContainer}>
            <header style={styles.savedScreenHeader}>
                <button
                    style={{
                        ...styles.savedBackButton,
                        ...(backButtonHovered ? styles.savedBackButtonHover : {})
                    }}
                    onClick={onBack}
                    onMouseEnter={() => setBackButtonHovered(true)}
                    onMouseLeave={() => setBackButtonHovered(false)}
                >
                    <ChevronLeft size={28} color="#333" />
                </button>

                <h1 style={styles.savedScreenTitle}>My Saved Restaurants</h1>

                <div style={{ width: 28 }} />
            </header>

            <div style={styles.savedContent}>
                {savedItems.length === 0 ? (
                    <div style={styles.savedNoItemsContainer}>
                        <div style={styles.savedNoItemsCard}>
                            <Heart size={48} color="#ff6b6b" />
                            <h2 style={styles.savedNoItemsText}>You haven't saved any restaurants yet.</h2>
                            <p style={styles.savedNoItemsSubText}>Swipe right on cards to save them for later!</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {savedItems.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    ...styles.savedListItem,
                                    ...(hoveredItem === item.id ? styles.savedListItemHover : {})
                                }}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <img src={item.heroPhoto} style={styles.savedItemImage} alt={item.name} />

                                <div style={styles.savedItemInfo}>
                                    <h3 style={styles.savedItemName}>{item.name}</h3>
                                    <p style={styles.savedItemCuisine}>{item.cuisine}</p>
                                    <div style={styles.savedItemDetails}>
                                        <Star size={14} color="#f1c40f" fill="#f1c40f" />
                                        <span style={styles.savedItemDetailsText}>{item.rating}</span>
                                        <span style={styles.savedItemDetailsText}> • {item.price}</span>
                                    </div>
                                </div>

                                <button
                                    style={{
                                        ...styles.savedNavigateButton,
                                        ...(hoveredButton === item.id ? styles.savedNavigateButtonHover : {})
                                    }}
                                    onClick={() => onNavigate(item)}
                                    onMouseEnter={() => setHoveredButton(item.id)}
                                    onMouseLeave={() => setHoveredButton(null)}
                                >
                                    <MapPin size={20} color="#fff" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};