import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Heart, User, ThumbsUp, ThumbsDown, Save } from 'lucide-react';
import { styles } from '../styles/styles';
import { RestaurantCard } from '../components/RestaurantCard';
import { ClipLoader } from 'react-spinners';

export const MainScreen = ({ restaurants, onAction, onShowSaved, onShowProfile, isLoadingMore, hasMoreRestaurants, isInitialLoading }) => {
  const [showDetails, setShowDetails] = useState(false);

  const position = useRef({ x: 0, y: 0 }).current;
  const cardRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 }).current;

  useEffect(() => {
    setShowDetails(false);
  }, [restaurants]);

  const handleSwipe = (direction) => {
    const item = restaurants[0]; // Always use first item
    if (!item) return;

    if (direction === 'right') onAction(item.id, 'LIKE');
    if (direction === 'left') onAction(item.id, 'DISLIKE');

    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease-out';
      cardRef.current.style.transform = `translateX(${direction === 'right' ? 500 : -500}px) rotate(${direction === 'right' ? 20 : -20}deg)`;
    }

    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = 'none';
        cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
      setShowDetails(false);
    }, 300);
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startPos.x = e.clientX || e.touches[0].clientX;
    if (cardRef.current) cardRef.current.style.transition = 'none';
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

    if (isInitialLoading) {
      return (
        <div style={styles.loadingContainer}>
          <ClipLoader
            color="#3498db"
            size={50}
            loading={true}
            speedMultiplier={0.8}
          />
          <h2 style={styles.loadingText}>Finding restaurants...</h2>
          <p style={styles.loadingSubText}>We're searching for great places near you!</p>
        </div>
      );
    }

    if (restaurants.length === 0 && isLoadingMore) {
      return (
        <div style={styles.loadingContainer}>
          <ClipLoader
            color="#3498db"
            size={50}
            loading={true}
            speedMultiplier={0.8}
          />
          <h2 style={styles.loadingText}>Finding more restaurants...</h2>
          <p style={styles.loadingSubText}>We're searching for great places near you!</p>
        </div>
      );
    }

    // Show no more restaurants when empty and not loading
    if (restaurants.length === 0 && !hasMoreRestaurants) {
      return (
        <div style={styles.noMoreCards}>
          <AlertCircle size={48} color="#666" />
          <h2 style={styles.noMoreCardsText}>No more restaurants found!</h2>
          <p style={styles.noMoreCardsSubText}>Try adjusting your filters or distance to find more options.</p>
          <button style={styles.noMoreCardsButton} onClick={onShowProfile}>Change Filters</button>
        </div>
      );
    }

    // Show no restaurants match filters
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

    return restaurants.slice(0, 3).map((item, i) => {
      const isTopCard = i === 0;
      const cardStyle = {
        ...styles.cardWrapper,
        zIndex: 3 - i,
        transform: isTopCard ? 'none' : `translateY(${i * 10}px) scale(${1 - i * 0.05})`,
        opacity: isTopCard ? 1 : (1 - i * 0.3),
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
          <div onClick={() => isTopCard && setShowDetails(!showDetails)} style={{ height: '100%' }}>
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
      {restaurants.length > 0 && (
        <footer style={styles.footer}>
          <button style={{ ...styles.actionButton, ...styles.dislikeButton }} onClick={() => handleSwipe('left')}>
            <ThumbsDown color="#e74c3c" size={32} />
          </button>
          <button style={{ ...styles.actionButton, ...styles.saveButtonFooter }} onClick={() => {
            onAction(restaurants[0].id, 'SAVE');
          }}>
            <Save color="#3498db" size={32} />
          </button>
          <button style={{ ...styles.actionButton, ...styles.likeButton }} onClick={() => onAction(restaurants[0].id, 'LIKE')}>
            <ThumbsUp color="#2ecc71" size={32} />
          </button>
        </footer>
      )}
    </div>
  );
};