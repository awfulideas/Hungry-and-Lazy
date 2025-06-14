import React, { useState, useRef, useEffect, useCallback } from 'react';
import { styles } from '../styles/styles';

// --- Reusable Price Range Slider Component ---
export const PriceRangeSlider = ({ min, max, onMinChange, onMaxChange }) => {
    const prices = ['$', '$$', '$$$', '$$$$'];
    const trackRef = useRef(null);
    const [dragging, setDragging] = useState(null);

    const valueToPercent = (value) => ((value - 1) / (prices.length - 1)) * 100;

    const handlePointerMove = useCallback((event) => {
        if (!dragging || !trackRef.current) return;
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const newValue = Math.round((percent / 100) * (prices.length - 1)) + 1;

        if (dragging === 'min') {
            onMinChange(Math.min(newValue, max));
        } else if (dragging === 'max') {
            onMaxChange(Math.max(newValue, min));
        }
    }, [dragging, min, max, onMinChange, onMaxChange, prices.length]);

    const handlePointerUp = useCallback(() => {
        setDragging(null);
    }, []);

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('touchmove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchend', handlePointerUp);
        }

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [dragging, handlePointerMove, handlePointerUp]);
    
    const minPercent = valueToPercent(min);
    const maxPercent = valueToPercent(max);

    return (
        <div style={styles.sliderContainer}>
            <div ref={trackRef} style={styles.sliderTrack}>
                <div style={{ ...styles.sliderRange, left: `${minPercent}%`, right: `${100 - maxPercent}%` }} />
                <div 
                    style={{ ...styles.sliderHandle, left: `${minPercent}%`}} 
                    onMouseDown={(e) => { e.preventDefault(); setDragging('min'); }}
                    onTouchStart={(e) => { e.preventDefault(); setDragging('min'); }}
                />
                <div 
                    style={{ ...styles.sliderHandle, left: `${maxPercent}%`}}
                    onMouseDown={(e) => { e.preventDefault(); setDragging('max'); }}
                    onTouchStart={(e) => { e.preventDefault(); setDragging('max'); }}
                />
            </div>
            <div style={styles.sliderLabels}>
                {prices.map((label, index) => {
                    const percent = ((index) / (prices.length - 1)) * 100;
                    return (
                        <span key={label} style={{...styles.sliderLabel, left: `${percent}%`}}>
                            {label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};