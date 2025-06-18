export const openGoogleMaps = (restaurant) => {
    try {
        const url = restaurant.placeId
            ? `https://www.google.com/maps/place/?q=place_id:${restaurant.placeId}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + (restaurant.vicinity || ''))}`;

        window.open(url, '_blank', 'noopener,noreferrer');

    } catch (error) {
        console.error('Error opening Google Maps:', error);
        alert(`Please search for: ${restaurant.name} ${restaurant.vicinity || ''}`);
    }
};