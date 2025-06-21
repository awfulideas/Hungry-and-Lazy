export const openGoogleMaps = (restaurant) => {
    try {
        // Create a search query with restaurant name and location
        const searchQuery = encodeURIComponent(
            `${restaurant.name} ${restaurant.vicinity || restaurant.address || ''}`
        );

        // Use a universal Google Maps URL that works on both web and mobile
        const url = `https://maps.google.com/?q=${searchQuery}`;

        window.open(url, '_blank', 'noopener,noreferrer');

    } catch (error) {
        console.error('Error opening Google Maps:', error);
        alert(`Please search for: ${restaurant.name} ${restaurant.vicinity || ''}`);
    }
};