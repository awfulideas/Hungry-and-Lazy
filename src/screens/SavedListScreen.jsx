import React from 'react';
import { Heart, ChevronLeft, Star, MapPin } from 'lucide-react';
import { styles } from '../styles/styles';
import { openGoogleMaps } from '../utils/openGoogleMaps';

export const SavedListScreen = ({ savedItems, onBack, onNavigate }) => (
    <div style={styles.savedContainer}>
        <header style={styles.savedHeader}>
            <button style={styles.iconButton} onClick={onBack}><ChevronLeft size={28} color="#333" /></button>
            <h1 style={styles.savedTitle}>My Saved Restaurants</h1>
            <div style={{width: 28}} />
        </header>
        {savedItems.length === 0 ? (
            <div style={styles.noSavedItems}>
                <Heart size={48} color="#ccc" />
                <h2 style={styles.noSavedText}>You haven't saved any restaurants yet.</h2>
                <p style={styles.noSavedSubText}>Swipe right on cards to save them for later!</p>
            </div>
        ) : (
            <div style={{overflowY: 'auto'}}>
                {savedItems.map(item => (
                    <div key={item.id} style={styles.savedItem}>
                        <img src={item.heroPhoto} style={styles.savedItemImage} alt={item.name}/>
                        <div style={styles.savedItemInfo}>
                            <h3 style={styles.savedItemName}>{item.name}</h3>
                            <p style={styles.savedItemCuisine}>{item.cuisine}</p>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: 4}}>
                                <Star size={14} color="#f1c40f" fill="#f1c40f" />
                                <span style={styles.savedItemDetailsText}>{item.rating}</span>
                                <span style={styles.savedItemDetailsText}> • {item.price}</span>
                            </div>
                        </div>
                        <button style={styles.navigateButton} onClick={() => onNavigate(item)}>
                            <MapPin size={24} color="#fff" />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);