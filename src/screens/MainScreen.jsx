import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Heart, User, ThumbsUp, ThumbsDown, Save } from 'lucide-react';
import { styles } from '../styles/styles';
import { RestaurantCard } from '../components/RestaurantCard';

export const MainScreen = ({ restaurants, onAction, onShowSaved, onShowProfile }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    
    const position = useRef({ x: 0, y: 0 }).current;
    const cardRef = useRef(null);
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 }).current;
  
    useEffect(() => {
      setCurrentIndex(0);
      setShowDetails(false);
    }, [restaurants]);
  
    const handleSwipe = (direction) => {
      const item = restaurants[currentIndex];
      if (!item) return;
  
      if (direction === 'right') onAction(item.id, 'SAVE');
      if (direction === 'left') onAction(item.id, 'DISLIKE');
      
      if (cardRef.current) {
          cardRef.current.style.transition = 'transform 0.3s ease-out';
          cardRef.current.style.transform = `translateX(${direction === 'right' ? 500 : -500}px) rotate(${direction === 'right' ? 20 : -20}deg)`;
      }
  
      setTimeout(() => {
          if(cardRef.current) {
              cardRef.current.style.transition = 'none';
              cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
          }
          setCurrentIndex(prev => prev + 1);
          setShowDetails(false);
      }, 300);
    };
    
    const handlePointerDown = (e) => {
      isDragging.current = true;
      startPos.x = e.clientX || e.touches[0].clientX;
      if(cardRef.current) cardRef.current.style.transition = 'none';
    };
    
    const handlePointerMove = (e) => {
      if (!isDragging.current || !cardRef.current) return;
      const currentX = e.clientX || e.touches[0].clientX;
      const diffX = currentX - startPos.x;
      position.x = diffX;
  
      const rotation = diffX / 15;
      cardRef.current.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
    };
  
    const handlePointerUp = () => {
      isDragging.current = false;
      if (Math.abs(position.x) < 100) {
          if (cardRef.current) {
              cardRef.current.style.transition = 'transform 0.3s ease';
              cardRef.current.style.transform = 'translateX(0px) rotate(0deg)';
          }
      } else {
          handleSwipe(position.x > 0 ? 'right' : 'left');
      }
      position.x = 0;
    };
  
    const renderCards = () => {
      if (restaurants.length === 0) {
        return (
          <div style={styles.noMoreCards}>
            <AlertCircle size={48} color="#666" />
            <h2 style={styles.noMoreCardsText}>No restaurants match your criteria.</h2>
            <p style={styles.noMoreCardsSubText}>Try adjusting your profile settings!</p>
            <button style={styles.noMoreCardsButton} onClick={onShowProfile}>Edit Profile</button>
          </div>
        );
      }
  
      if (currentIndex >= restaurants.length) {
        return (
          <div style={styles.noMoreCards}>
            <AlertCircle size={48} color="#666" />
            <h2 style={styles.noMoreCardsText}>That's all for now!</h2>
            <p style={styles.noMoreCardsSubText}>You've seen all matching restaurants. Check your saved list or edit your profile for more.</p>
            <button style={styles.noMoreCardsButton} onClick={onShowProfile}>Edit Profile</button>
          </div>
        );
      }
      
      return restaurants.map((item, i) => {
          if (i < currentIndex) return null;
          const isTopCard = i === currentIndex;
          const cardStyle = {
              ...styles.cardWrapper,
              zIndex: restaurants.length - i,
              transform: isTopCard ? 'none' : `translateY(${(i - currentIndex) * 10}px) scale(${1 - (i - currentIndex) * 0.05})`,
              opacity: isTopCard ? 1 : (1 - (i - currentIndex) * 0.3),
              transition: 'transform 0.3s, opacity 0.3s'
          };
  
          return (
              <div key={item.id} style={cardStyle} 
                  ref={isTopCard ? cardRef : null}
                  onMouseDown={isTopCard ? handlePointerDown : null}
                  onMouseMove={isTopCard ? handlePointerMove : null}
                  onMouseUp={isTopCard ? handlePointerUp : null}
                  onMouseLeave={isTopCard ? handlePointerUp : null}
                  onTouchStart={isTopCard ? handlePointerDown : null}
                  onTouchMove={isTopCard ? handlePointerMove : null}
                  onTouchEnd={isTopCard ? handlePointerUp : null}
              >
                  <div onClick={() => isTopCard && setShowDetails(!showDetails)} style={{height: '100%'}}>
                      <RestaurantCard restaurant={item} isDetailsVisible={showDetails && isTopCard} />
                  </div>
              </div>
          );
      });
    };
  
    return (
      <div style={styles.mainScreenContainer}>
        <header style={styles.header}>
          <button style={styles.iconButton} onClick={onShowProfile}><User size={28} color="#555" /></button>
          <h1 style={styles.appName}>Food-Swipe</h1>
          <button style={styles.iconButton} onClick={onShowSaved}><Heart size={28} color="#555" /></button>
        </header>
        <main style={styles.deckContainer}>{renderCards()}</main>
        {currentIndex < restaurants.length && (
          <footer style={styles.footer}>
            <button style={{...styles.actionButton, ...styles.dislikeButton}} onClick={() => handleSwipe('left')}><ThumbsDown color="#e74c3c" size={32} /></button>
            <button style={{...styles.actionButton, ...styles.saveButtonFooter}} onClick={() => { onAction(restaurants[currentIndex].id, 'SAVE'); handleSwipe('right'); }}><Save color="#3498db" size={32} /></button>
            <button style={{...styles.actionButton, ...styles.likeButton}} onClick={() => onAction(restaurants[currentIndex].id, 'LIKE')}><ThumbsUp color="#2ecc71" size={32} /></button>
          </footer>
        )}
      </div>
    );
  };