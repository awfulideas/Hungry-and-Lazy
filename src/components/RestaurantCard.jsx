import React from 'react';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { styles } from '../styles/styles';
import { InfoPill } from './InfoPill';

export const RestaurantCard = ({ restaurant, isDetailsVisible }) => (
    <div style={styles.card}>
      <img src={restaurant.heroPhoto} style={styles.cardImage} alt={restaurant.name} />
      <div style={styles.gradientOverlay} />
      <div style={styles.cardInfo}>
        <h2 style={styles.cardName}>{restaurant.name}</h2>
        <p style={styles.cardCuisine}>{restaurant.cuisine}</p>
      </div>
      {isDetailsVisible && (
        <div style={styles.detailsView}>
          <h3 style={styles.detailsTitle}>About</h3>
          <p style={styles.detailsSummary}>{restaurant.summary}</p>
          <h3 style={styles.detailsTitle}>Highlights</h3>
          {restaurant.highlights.map(highlight => (
            <div key={highlight} style={styles.highlightItem}>
              <Star size={16} color="#3498db" />
              <p style={styles.highlightText}>{highlight}</p>
            </div>
          ))}
          <div style={styles.infoRow}>
            <InfoPill icon={<MapPin size={14} color="#fff" />} text={`${restaurant.distance} km`} />
            <InfoPill icon={<Star size={14} color="#fff" />} text={`${restaurant.rating} Rating`} />
            <InfoPill icon={<DollarSign size={14} color="#fff" />} text={`${restaurant.price}`} />
          </div>
        </div>
      )}
    </div>
);