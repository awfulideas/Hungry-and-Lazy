import React from 'react';
import { styles } from '../styles/styles';
import { StarRating } from './StarRating';

export const StarInfoPill = ({ rating, reviewCount }) => {
    return (
        <div style={{
            ...styles.infoPill,
            gap: '5px'
        }}>
            <span style={styles.infoPillText}>
                {rating}
            </span>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1px' 
            }}>
                <StarRating rating={rating} size={11} />
                {reviewCount > 0 && (
                    <span style={{
                        ...styles.infoPillText,
                        fontSize: '10px',
                        opacity: 0.8
                    }}>
                        ({reviewCount})
                    </span>
                )}
            </div>
        </div>
    );
};