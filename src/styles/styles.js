export const styles = {
  container: { height: '100vh', backgroundColor: '#F5F5F5', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
    margin: 0, // Remove bottom margin
    fontWeight: '400',
    textAlign: 'center', // Center align the text
    lineHeight: 1.4
  },
  profileSublabel: { fontSize: 14, color: '#666', marginBottom: 10 },
  label: { display: 'block', fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 10 },
  mainScreenContainer: { flex: 1, display: 'flex', flexDirection: 'column', height: '100%' },
  header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #eee', backgroundColor: '#fff', flexShrink: 0 },
  iconButton: { background: 'none', border: 'none', cursor: 'pointer', padding: 5 },
  footer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: 20, backgroundColor: '#fff', flexShrink: 0 },
  card: { position: 'relative', width: '100%', height: '100%', borderRadius: 20, backgroundColor: '#fff', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', cursor: 'pointer' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  gradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' },
  cardInfo: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  cardName: { fontSize: 32, fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)', margin: 0 },
  cardCuisine: { fontSize: 20, color: '#eee', textShadow: '1px 1px 3px rgba(0,0,0,0.7)', margin: 0 },
  detailsView: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' },
  detailsTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, borderBottom: '1px solid #555', paddingBottom: 5 },
  detailsSummary: { fontSize: 16, color: '#ddd', lineHeight: 1.5 },
  highlightItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  highlightText: { color: '#ddd', fontSize: 16, marginLeft: 10 },
  infoRow: { display: 'flex', justifyContent: 'space-around', marginTop: 20, paddingTop: 15, borderTop: '1px solid #555' },
  infoPill: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: 20 },
  infoPillText: { color: '#fff', marginLeft: 5, fontWeight: '600' },
  savedItemImage: { width: 80, height: 80, borderRadius: 12, objectFit: 'cover' },
  savedItemInfo: { flex: 1, marginLeft: 15 },
  savedItemName: { fontSize: 18, fontWeight: 'bold', margin: 0 },
  savedItemCuisine: { fontSize: 14, color: '#666', margin: '4px 0 0 0' },
  savedItemDetailsText: { fontSize: 14, color: '#666', marginLeft: 4 },
  sliderContainer: {
    paddingTop: 10, // Reduced from 20
    paddingBottom: 5, // Reduced from 10
    maxWidth: '500px',
    marginLeft: 15
  },

  sliderTrack: {
    position: 'relative',
    height: 3, // Reduced from 4
    backgroundColor: '#ddd',
    borderRadius: 2
  },

  sliderRange: {
    position: 'absolute',
    height: 3, // Reduced from 4
    backgroundColor: '#3498db',
    borderRadius: 2
  },

  sliderHandle: {
    position: 'absolute',
    top: '50%',
    width: 18, // Reduced from 24
    height: 18, // Reduced from 24
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    zIndex: 1
  },

  sliderLabels: {
    position: 'relative',
    height: 15, // Reduced from 20
    marginTop: 10 // Reduced from 15
  },

  sliderLabel: {
    fontSize: 12, // Reduced from 14
    color: '#666',
    position: 'absolute',
    transform: 'translateX(-50%)'
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 40,
    textAlign: 'center',
    minHeight: '60vh',
  },

  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    margin: '20px 0 10px 0',
  },

  loadingSubText: {
    fontSize: 16,
    color: '#666',
    margin: 0
  },

  backButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f0f0f0'
    }
  },

  profileContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },

  profileHeaderNew: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 25px 10px', // Reduced padding
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0
  },

  profileBackButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },

  profileTitleNew: {
    fontSize: 28,
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    letterSpacing: '-1px'
  },

  profileContent: {
    flex: 1,
    padding: '15px 25px', // Reduced top/bottom padding
    display: 'flex',
    flexDirection: 'column',
    gap: 20, // Smaller gap between sections
  },

  profileRow: {
    display: 'flex',
    gap: 30,
    alignItems: 'flex-start'
  },

  profileColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 25
  },

  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8 // Reduced gap
  },

  profileSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    margin: 0,
    letterSpacing: '-0.5px'
  },

  profileOptionGrid: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 8,
    justifyContent: 'space-between'
  },

  profileCuisineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Exactly 3 per row
    gap: 8,
    gridAutoRows: 'min-content' // Adjust row height to content
  },

  profileOptionButtonNew: {
    padding: '8px 6px', // Reduced horizontal padding for more text space
    borderRadius: 16,
    border: '2px solid #e0e0e0',
    background: 'rgba(255, 255, 255, 0.7)',
    color: '#555',
    fontSize: 11, // Smaller font for longer text
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    backdropFilter: 'blur(5px)',
    whiteSpace: 'nowrap',
    flex: 1,
    minWidth: 0,
    display: 'flex', // Add flex for better centering
    alignItems: 'center', // Vertical centering
    justifyContent: 'center', // Horizontal centering
    lineHeight: 1.2, // Better line height
    overflow: 'hidden', // Hide overflow
    textOverflow: 'ellipsis' // Handle long text
  },

  profileOptionButtonSelectedNew: {
    padding: '8px 6px', // Reduced horizontal padding
    borderRadius: 16,
    border: '2px solid #4ecdc4',
    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    color: '#fff',
    fontSize: 11, // Smaller font
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(78, 205, 196, 0.4)',
    transform: 'translateY(-1px)',
    whiteSpace: 'nowrap',
    flex: 1,
    minWidth: 0,
    display: 'flex', // Add flex for better centering
    alignItems: 'center', // Vertical centering
    justifyContent: 'center', // Horizontal centering
    lineHeight: 1.2, // Better line height
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  // Also update the cuisine buttons to be smaller:
  profileCuisineButton: {
    padding: '6px 8px', // Smaller padding
    borderRadius: 14,
    border: '2px solid #e0e0e0',
    background: 'rgba(255, 255, 255, 0.7)',
    color: '#555',
    fontSize: 11, // Very small font
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    backdropFilter: 'blur(5px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  profileCuisineButtonSelected: {
    padding: '6px 8px',
    borderRadius: 14,
    border: '2px solid #4ecdc4',
    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(78, 205, 196, 0.4)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  profileCuisineButtonExcluded: {
    padding: '6px 8px',
    borderRadius: 14,
    border: '2px solid #e74c3c',
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(231, 76, 60, 0.4)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  profileSaveButtonNew: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
    border: 'none',
    borderRadius: 25,
    padding: '18px 40px',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    margin: '20px 25px 25px',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  profileHeaderContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },

  profileBackButtonTopLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10 // Make sure it's above other content
  },

  // New centered header style
  profileHeaderCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 25px 15px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0
  },

  profileTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 5
  },

  mainScreenContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },

  mainHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 25px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0
  },

  mainIconButton: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    cursor: 'pointer',
    padding: 10,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  mainIconButtonHover: {
    transform: 'translateY(-1px)', // Reduced hover effect
    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Subtle hover background
  },

  mainAppName: {
    fontSize: 28,
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    letterSpacing: '-1px'
  },

  mainDeckContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px'
  },

  mainFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 45,
    padding: '25px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0
  },

  mainActionButton: {
    cursor: 'pointer',
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(5px)'
  },

  mainActionButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
  },

  mainDislikeButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
    color: '#fff'
  },

  mainSaveButton: {
    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    color: '#fff'
  },

  mainLikeButton: {
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    color: '#fff'
  },

  mainCardWrapper: {
    position: 'absolute',
    width: '90vw',
    height: '70vh',
    maxWidth: 380,
    maxHeight: 580,
    userSelect: 'none'
  },

  mainCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.2)'
  },

  // Updated no cards styles
  mainNoMoreCards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    margin: 20
  },

  mainNoMoreCardsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    margin: 0,
    letterSpacing: '-0.5px'
  },

  mainNoMoreCardsSubText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    lineHeight: 1.5
  },

  mainNoMoreCardsButton: {
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: '15px 30px',
    borderRadius: 20,
    marginTop: 25,
    border: 'none',
    boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Loading styles
  mainLoadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 40,
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    margin: 20
  },

  mainLoadingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    margin: '20px 0 10px 0',
    letterSpacing: '-0.5px'
  },

  mainLoadingSubText: {
    fontSize: 16,
    color: '#666',
    margin: 0,
    lineHeight: 1.5
  },

  // SavedListScreen styles
  savedScreenContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },

  savedScreenHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 25px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0
  },

  savedBackButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 12,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  savedBackButtonHover: {
    transform: 'translateY(-1px)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },

  savedScreenTitle: {
    fontSize: 24,
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    letterSpacing: '-0.5px'
  },

  savedContent: {
    flex: 1,
    padding: '20px 0',
    overflow: 'auto'
  },

  savedNoItemsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    textAlign: 'center'
  },

  savedNoItemsCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    padding: 40,
    maxWidth: 400,
    width: '100%'
  },

  savedNoItemsText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    margin: 0,
    letterSpacing: '-0.5px'
  },

  savedNoItemsSubText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    lineHeight: 1.5
  },

  savedListItem: {
    display: 'flex',
    padding: '20px 25px',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
    margin: '0 20px 12px',
    borderRadius: 16,
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  savedListItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
    background: 'rgba(255, 255, 255, 0.9)'
  },

  savedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },

  savedItemInfo: {
    flex: 1,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },

  savedItemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    margin: 0,
    letterSpacing: '-0.3px'
  },

  savedItemCuisine: {
    fontSize: 14,
    color: '#666',
    margin: 0,
    fontWeight: '500'
  },

  savedItemDetails: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 4
  },

  savedItemDetailsText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500'
  },

  savedNavigateButton: {
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  savedNavigateButtonHover: {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 25px rgba(46, 204, 113, 0.6)'
  },

};