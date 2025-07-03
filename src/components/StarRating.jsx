import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating, size = 14, color = "#FFD700" }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          color={color} 
          fill={color}
        />
      );
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half star - fixed alignment
      stars.push(
        <div key={i} style={{ 
          position: 'relative', 
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`
        }}>
          {/* Background empty star */}
          <Star 
            size={size} 
            color="#ddd" 
            fill="#ddd" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0,
              margin: 0 // Remove any default margins
            }}
          />
          {/* Half overlay - ensure exact positioning */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            overflow: 'hidden'
          }}>
            <Star 
              size={size} 
              color={color} 
              fill={color}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0 // Remove any default margins
              }}
            />
          </div>
        </div>
      );
    } else {
      // Empty star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          color="#ddd" 
          fill="#ddd"
        />
      );
    }
  }
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: '1px'
    }}>
      {stars}
    </div>
  );
};