import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Heart, User, ThumbsUp, ThumbsDown, Save } from 'lucide-react';
import { styles } from '../styles/styles';
import { RestaurantCard } from '../components/RestaurantCard';
import { ClipLoader } from 'react-spinners';

export const MainScreen = ({ restaurants, onAction, onShowSaved, onShowProfile, isLoadingMore, hasMoreRestaurants, isInitialLoading }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [profileButtonHovered, setProfileButtonHovered] = useState(false);
  const [savedButtonHovered, setSavedButtonHovered] = useState(false);
  const [dislikeButtonHovered, setDislikeButtonHovered] = useState(false);
  const [saveButtonHovered, setSaveButtonHovered] = useState(false);
  const [likeButtonHovered, setLikeButtonHovered] = useState(false);

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
        <div style={styles.mainLoadingContainer}>
          <ClipLoader
            color="#ff6b6b"
            size={50}
            loading={true}
            speedMultiplier={0.8}
          />
          <h2 style={styles.mainLoadingText}>Finding restaurants...</h2>
          <p style={styles.mainLoadingSubText}>We're searching for great places near you!</p>
        </div>
      );
    }

    if (restaurants.length === 0 && isLoadingMore) {
      return (
        <div style={styles.mainLoadingContainer}>
          <ClipLoader
            color="#ff6b6b"
            size={50}
            loading={true}
            speedMultiplier={0.8}
          />
          <h2 style={styles.mainLoadingText}>Finding more restaurants...</h2>
          <p style={styles.mainLoadingSubText}>We're searching for great places near you!</p>
        </div>
      );
    }

    if (restaurants.length === 0 && !hasMoreRestaurants) {
      return (
        <div style={styles.mainNoMoreCards}>
          <AlertCircle size={48} color="#ff6b6b" />
          <h2 style={styles.mainNoMoreCardsText}>No more restaurants found!</h2>
          <p style={styles.mainNoMoreCardsSubText}>Try adjusting your filters or distance to find more options.</p>
          <button
            style={styles.mainNoMoreCardsButton}
            onClick={onShowProfile}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(255, 107, 107, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }}
          >
            Change Filters
          </button>
        </div>
      );
    }

    if (restaurants.length === 0) {
      return (
        <div style={styles.mainNoMoreCards}>
          <AlertCircle size={48} color="#ff6b6b" />
          <h2 style={styles.mainNoMoreCardsText}>No restaurants match your criteria.</h2>
          <p style={styles.mainNoMoreCardsSubText}>Try adjusting your profile settings!</p>
          <button
            style={styles.mainNoMoreCardsButton}
            onClick={onShowProfile}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(255, 107, 107, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }}
          >
            Edit Profile
          </button>
        </div>
      );
    }

    return restaurants.slice(0, 3).map((item, i) => {
      const isTopCard = i === 0;
      const cardStyle = {
        ...styles.mainCardWrapper,
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
            <div style={styles.mainCard}>
              <RestaurantCard restaurant={item} isDetailsVisible={showDetails && isTopCard} />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={styles.mainScreenContainer}>
      <header style={styles.mainHeader}>
        <button
          style={{
            ...styles.mainIconButton,
            ...(profileButtonHovered ? styles.mainIconButtonHover : {})
          }}
          onClick={onShowProfile}
          onMouseEnter={() => setProfileButtonHovered(true)}
          onMouseLeave={() => setProfileButtonHovered(false)}
        >
          <User size={24} color="#555" />
        </button>

        <h1 style={styles.mainAppName}>Lazy +</h1>

        <button
          style={{
            ...styles.mainIconButton,
            ...(savedButtonHovered ? styles.mainIconButtonHover : {})
          }}
          onClick={onShowSaved}
          onMouseEnter={() => setSavedButtonHovered(true)}
          onMouseLeave={() => setSavedButtonHovered(false)}
        >
          <Heart size={24} color="#555" />
        </button>
      </header>

      <main style={styles.mainDeckContainer}>
        {renderCards()}
      </main>

      {restaurants.length > 0 && (
        <footer style={styles.mainFooter}>
          <button
            style={{
              ...styles.mainActionButton,
              ...styles.mainDislikeButton,
              ...(dislikeButtonHovered ? styles.mainActionButtonHover : {})
            }}
            onClick={() => handleSwipe('left')}
            onMouseEnter={() => setDislikeButtonHovered(true)}
            onMouseLeave={() => setDislikeButtonHovered(false)}
          >
            <ThumbsDown size={24} />
          </button>

          <button
            style={{
              ...styles.mainActionButton,
              ...styles.mainSaveButton,
              ...(saveButtonHovered ? styles.mainActionButtonHover : {})
            }}
            onClick={() => onAction(restaurants[0].id, 'SAVE')}
            onMouseEnter={() => setSaveButtonHovered(true)}
            onMouseLeave={() => setSaveButtonHovered(false)}
          >
            <Save size={24} />
          </button>

          <button
            style={{
              ...styles.mainActionButton,
              ...styles.mainLikeButton,
              ...(likeButtonHovered ? styles.mainActionButtonHover : {})
            }}
            onClick={() => onAction(restaurants[0].id, 'LIKE')}
            onMouseEnter={() => setLikeButtonHovered(true)}
            onMouseLeave={() => setLikeButtonHovered(false)}
          >
            <ThumbsUp size={24} />
          </button>
        </footer>
      )}
    </div>
  );
};