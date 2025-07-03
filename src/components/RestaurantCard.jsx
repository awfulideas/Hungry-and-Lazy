import React from 'react';
import { MapPin } from 'lucide-react';
import { styles } from '../styles/styles';
import { InfoPill } from './InfoPill';
import { StarInfoPill } from './StarInfoPill';
import { PriceInfoPill } from './PriceInfoPill';

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
          <p style={styles.highlightText}>{restaurant.description}</p>
          {/* {restaurant.highlights.map(highlight => (
            <div key={highlight} style={styles.highlightItem}>
              <Star size={16} color="#3498db" />
              <p style={styles.highlightText}>{highlight}</p>
            </div>
          ))} */}
          <div style={{
            ...styles.infoRow,
            justifyContent: 'space-around',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <InfoPill 
              icon={<MapPin size={12} color="#fff" />} 
              text={`${restaurant.distance} mi`}
              type="distance"
            />
            <StarInfoPill rating={restaurant.rating} reviewCount={restaurant.reviewCount} />
            <PriceInfoPill price={restaurant.price} />
          </div>
        </div>
      )}
    </div>
);