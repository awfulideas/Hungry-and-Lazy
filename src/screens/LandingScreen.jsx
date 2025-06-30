import React from 'react';
import { Clock, Zap } from 'lucide-react';

const landingStyles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    background: '#F5F5F5',
    color: '#333',
    textAlign: 'center',
    minHeight: '100vh'
  },
  
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative'
  },

  logoMain: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5
  },

  lazyText: {
    fontSize: 52,
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa8a8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-2px',
    textShadow: '0 4px 8px rgba(255, 107, 107, 0.3)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },

  andText: {
    fontSize: 40,
    fontWeight: '500',
    color: '#4ecdc4',
    fontStyle: 'italic',
    letterSpacing: '1px',
    textShadow: '0 2px 4px rgba(78, 205, 196, 0.2)',
    marginLeft: 4,
  },

  // Animated subtitle container
  logoSubtitleContainer: {
    position: 'relative',
    height: 25, // Fixed height to prevent layout shifts
    overflow: 'hidden',
    marginTop: 5,
    width: 120 // Fixed width to prevent horizontal shifts
  },

  logoSubtitle: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '400',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    whiteSpace: 'nowrap'
  },

  logoSubtitleEntering: {
    transform: 'translateX(-50%) translateY(30px)',
    opacity: 0
  },

  logoSubtitleActive: {
    transform: 'translateX(-50%) translateY(0px)',
    opacity: 0.8
  },

  logoSubtitleExiting: {
    transform: 'translateX(-50%) translateY(-30px)',
    opacity: 0
  },

  decorativeElement: {
    position: 'absolute',
    top: -10,
    right: -20,
    fontSize: 24,
    opacity: 0.6,
    animation: 'float 3s ease-in-out infinite'
  },
  
  subtitle: {
    fontSize: 22,
    marginBottom: 60,
    color: '#5a6c7d',
    fontWeight: '300',
    lineHeight: 1.4
  },
  
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 25,
    display: 'flex',
    flexDirection: 'column'
  },
  
  hungerButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
    border: 'none',
    borderRadius: 25,
    padding: '20px 30px',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0) scale(1)',
    minHeight: 70,
    position: 'relative',
    overflow: 'hidden'
  },
  
  hungerButtonHovered: {
    background: 'linear-gradient(135deg, #ff5252 0%, #ff7979 100%)',
    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.6), 0 5px 15px rgba(255, 107, 107, 0.4)',
    transform: 'translateY(-8px) scale(1.02)',
  },
  
  laterButton: {
    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    border: 'none',
    borderRadius: 25,
    padding: '20px 30px',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0) scale(1)',
    minHeight: 70,
    position: 'relative',
    overflow: 'hidden'
  },
  
  laterButtonHovered: {
    background: 'linear-gradient(135deg, #26d0ce 0%, #2fb398 100%)',
    boxShadow: '0 15px 40px rgba(78, 205, 196, 0.6), 0 5px 15px rgba(78, 205, 196, 0.4)',
    transform: 'translateY(-8px) scale(1.02)',
  },
  
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    transition: 'transform 0.3s ease'
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  
  buttonSubtext: {
    fontSize: 14,
    opacity: 0.9,
    fontWeight: 'normal'
  },

  buttonShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s ease-in-out'
  },

  buttonShineActive: {
    left: '100%'
  }
};

// Add keyframes for floating animation
const floatingKeyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
`;

export const LandingScreen = ({ onHungryNow, onLater }) => {
  const [hungryHovered, setHungryHovered] = React.useState(false);
  const [laterHovered, setLaterHovered] = React.useState(false);
  const [hungryShine, setHungryShine] = React.useState(false);
  const [laterShine, setLaterShine] = React.useState(false);
  
  // Animated text cycling
  const words = ['Hungry', 'Thirsty', 'Bored'];
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Add the keyframes to the document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = floatingKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Text cycling effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 300); // Half of the animation duration
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Full animation duration
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleHungryNowClick = () => {
    onHungryNow();
  };

  const handleLaterClick = () => {
    onLater();
  };

  const handleHungryMouseEnter = () => {
    setHungryHovered(true);
    setHungryShine(true);
    setTimeout(() => setHungryShine(false), 500);
  };

  const handleHungryMouseLeave = () => {
    setHungryHovered(false);
  };

  const handleLaterMouseEnter = () => {
    setLaterHovered(true);
    setLaterShine(true);
    setTimeout(() => setLaterShine(false), 500);
  };

  const handleLaterMouseLeave = () => {
    setLaterHovered(false);
  };

  // Get the style for the animated text based on animation state
  const getAnimatedTextStyle = () => {
    if (isAnimating) {
      return {
        ...landingStyles.logoSubtitle,
        ...landingStyles.logoSubtitleExiting
      };
    }
    return {
      ...landingStyles.logoSubtitle,
      ...landingStyles.logoSubtitleActive
    };
  };

  return (
    <div style={landingStyles.container}>
      <div style={landingStyles.logoContainer}>
        <div style={landingStyles.logoMain}>
          <span style={landingStyles.lazyText}>Lazy</span>
          <span style={landingStyles.andText}>+</span>
        </div>
        
        <div style={landingStyles.logoSubtitleContainer}>
          <div style={getAnimatedTextStyle()}>
            {words[currentWordIndex]}
          </div>
        </div>
        
        <div style={landingStyles.decorativeElement}>🍕</div>
      </div>
      
      <p style={landingStyles.subtitle}>
        Discover amazing restaurants near you.<br />
        When do you want to eat?
      </p>
      
      <div style={landingStyles.buttonContainer}>
        <button 
          style={{
            ...landingStyles.hungerButton,
            ...(hungryHovered ? landingStyles.hungerButtonHovered : {})
          }}
          onClick={handleHungryNowClick}
          onMouseEnter={handleHungryMouseEnter}
          onMouseLeave={handleHungryMouseLeave}
          onTouchStart={handleHungryMouseEnter}
          onTouchEnd={handleHungryMouseLeave}
        >
          <div style={{
            ...landingStyles.buttonShine,
            ...(hungryShine ? landingStyles.buttonShineActive : {})
          }} />
          
          <div style={{
            ...landingStyles.buttonContent,
            transform: hungryHovered ? 'translateY(-2px)' : 'translateY(0)'
          }}>
            <Zap size={28} style={{ 
              filter: hungryHovered ? 'drop-shadow(0 2px 4px rgba(255,255,255,0.3))' : 'none',
              transition: 'filter 0.3s ease'
            }} />
            <div>
              <div style={landingStyles.buttonText}>Hungry Now!</div>
              <div style={landingStyles.buttonSubtext}>Find food within 1 mile</div>
            </div>
          </div>
        </button>
        
        <button 
          style={{
            ...landingStyles.laterButton,
            ...(laterHovered ? landingStyles.laterButtonHovered : {})
          }}
          onClick={handleLaterClick}
          onMouseEnter={handleLaterMouseEnter}
          onMouseLeave={handleLaterMouseLeave}
          onTouchStart={handleLaterMouseEnter}
          onTouchEnd={handleLaterMouseLeave}
        >
          <div style={{
            ...landingStyles.buttonShine,
            ...(laterShine ? landingStyles.buttonShineActive : {})
          }} />
          
          <div style={{
            ...landingStyles.buttonContent,
            transform: laterHovered ? 'translateY(-2px)' : 'translateY(0)'
          }}>
            <Clock size={28} style={{ 
              filter: laterHovered ? 'drop-shadow(0 2px 4px rgba(255,255,255,0.3))' : 'none',
              transition: 'filter 0.3s ease'
            }} />
            <div>
              <div style={landingStyles.buttonText}>Planning Ahead</div>
              <div style={landingStyles.buttonSubtext}>Set my preferences</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};