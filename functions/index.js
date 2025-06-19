/* eslint-disable no-undef */
// const { onRequest } = require('firebase-functions/v2/https');
const { onCall } = require("firebase-functions/v2/https");
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const { Client } = require('@googlemaps/google-maps-services-js');

admin.initializeApp();

const googleMapsClient = new Client({});

exports.getNearbyRestaurants = onCall(
    {
      timeoutSeconds: 60,
      memory: "256MiB",
      cors: true,
    },
    async (request) => {
      try {
        const {
          latitude, 
          longitude, 
          radius = 5000, 
          cuisine,
          pageToken // Add this for pagination
        } = request.data;
  
        if (!latitude || !longitude) {
          throw new Error("Latitude and longitude are required");
        }
  
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
          throw new Error("GOOGLE_PLACES_API_KEY environment variable is not set");
        }
  
        logger.info("Fetching restaurants", {
          latitude,
          longitude,
          radius,
          cuisine,
          hasPageToken: !!pageToken
        });
  
        let keyword = "restaurant";
        if (cuisine && cuisine !== "All") {
          keyword = `${cuisine} restaurant`;
        }
  
        // Build params object
        const params = {
          location: {lat: Number(latitude), lng: Number(longitude)},
          radius: Number(radius),
          keyword: keyword,
          type: "restaurant",
          key: apiKey,
        };
  
        // Add pagetoken if provided (for getting next page)
        if (pageToken) {
          params.pagetoken = pageToken;
        }
  
        const placesResponse = await googleMapsClient.placesNearby({
          params: params,
        });
  
        const transformedRestaurants = placesResponse.data.results.map(
          (place, index) => ({
            id: place.place_id || `restaurant-${index}`,
            name: place.name || "Unknown Restaurant",
            cuisine: extractCuisineFromTypes(place.types || []),
            price: convertPriceLevel(place.price_level),
            distance: calculateDistance(
              Number(latitude),
              Number(longitude),
              place.geometry?.location?.lat || 0,
              place.geometry?.location?.lng || 0
            ),
            rating: place.rating || 0,
            heroPhoto: getPhotoUrl(place.photos?.[0]?.photo_reference),
            summary: `${place.name} - ${place.vicinity}`,
            highlights: [],
            coords: {
              latitude: place.geometry?.location?.lat || 0,
              longitude: place.geometry?.location?.lng || 0,
            },
            isOpen: place.opening_hours?.open_now,
            vicinity: place.vicinity,
            placeId: place.place_id, // Add this for better Google Maps integration
          })
        );
  
        logger.info(`Found ${transformedRestaurants.length} restaurants`);
        
        // Return both restaurants and next page token
        return {
          restaurants: transformedRestaurants,
          nextPageToken: placesResponse.data.next_page_token || null,
          hasMore: !!placesResponse.data.next_page_token
        };
      } catch (error) {
        logger.error("Error fetching restaurants:", error);
        throw new Error("Failed to fetch restaurants");
      }
    }
  );

exports.getRestaurantDetails = onCall(
    {
        timeoutSeconds: 30,
        memory: '256MiB',
        cors: true,
    },
    async (request) => {
        try {
            const { placeId } = request.data; // Note: request.data instead of request.query

            if (!placeId) {
                throw new Error("Place ID is required");
            }

            logger.info('Fetching restaurant details', { placeId });

            const detailsResponse = await googleMapsClient.placeDetails({
                params: {
                    place_id: placeId,
                    fields: 'name,formatted_address,formatted_phone_number,website,' +
                        'opening_hours,reviews,photos',
                    key: process.env.GOOGLE_PLACES_API_KEY,
                },
            });

            const place = detailsResponse.data.result;

            // Extract highlights from reviews
            const highlights = place.reviews ?
                place.reviews.slice(0, 3).map((review) =>
                    review.text.split('.')[0] // Get first sentence of review
                ).filter((text) => text.length > 10 && text.length < 100) :
                [];

            const restaurantDetails = {
                name: place.name,
                address: place.formatted_address,
                phone: place.formatted_phone_number,
                website: place.website,
                openingHours: place.opening_hours?.weekday_text || [],
                highlights: highlights.length > 0 ? highlights :
                    ['Popular local spot', 'Great atmosphere', 'Recommended by locals'],
                photos: place.photos?.map((photo) =>
                    getPhotoUrl(photo.photo_reference)) || [],
            };

            return restaurantDetails; // Return directly, not response.json()
        } catch (error) {
            logger.error("Error fetching restaurant details:", error);
            throw new Error("Failed to fetch restaurant details");
        }
    }
);

exports.searchRestaurants = onCall(
    {
        timeoutSeconds: 60,
        memory: '256MiB',
        cors: true,
    },
    async (request) => {
        try {
            const { query, latitude, longitude, radius = 5000 } = request.data; // Note: request.data

            if (!query) {
                throw new Error("Search query is required");
            }

            logger.info('Searching restaurants', { query, latitude, longitude });

            const searchResponse = await googleMapsClient.textSearch({
                params: {
                    query: `${query} restaurant`,
                    location: latitude && longitude ?
                        { lat: Number(latitude), lng: Number(longitude) } : undefined,
                    radius: latitude && longitude ? Number(radius) : undefined,
                    type: 'restaurant',
                    key: process.env.GOOGLE_PLACES_API_KEY,
                },
            });

            const transformedRestaurants = searchResponse.data.results.map(
                (place, index) => ({
                    id: place.place_id || `restaurant-${index}`,
                    name: place.name || 'Unknown Restaurant',
                    cuisine: extractCuisineFromTypes(place.types || []),
                    price: convertPriceLevel(place.price_level),
                    distance: latitude && longitude ? calculateDistance(
                        Number(latitude),
                        Number(longitude),
                        place.geometry?.location?.lat || 0,
                        place.geometry?.location?.lng || 0
                    ) : null,
                    rating: place.rating || 0,
                    heroPhoto: getPhotoUrl(place.photos?.[0]?.photo_reference),
                    summary: `${place.name} - ${place.formatted_address}`,
                    highlights: [],
                    coords: {
                        latitude: place.geometry?.location?.lat || 0,
                        longitude: place.geometry?.location?.lng || 0,
                    },
                    isOpen: place.opening_hours?.open_now,
                    address: place.formatted_address,
                })
            );

            return { restaurants: transformedRestaurants }; // Return directly
        } catch (error) {
            logger.error("Error searching restaurants:", error);
            throw new Error("Failed to search restaurants");
        }
    }
);

// Helper functions
/**
 * Extract cuisine type from Google Places types array
 * @param {Array} types - Array of place types from Google Places
 * @return {string} - Cuisine type
 */
function extractCuisineFromTypes(types) {
    const cuisineMap = {
        'italian_restaurant': 'Italian',
        'mexican_restaurant': 'Mexican',
        'chinese_restaurant': 'Chinese',
        'japanese_restaurant': 'Japanese',
        'thai_restaurant': 'Thai',
        'indian_restaurant': 'Indian',
        'french_restaurant': 'French',
        'american_restaurant': 'American',
        'korean_restaurant': 'Korean',
        'vietnamese_restaurant': 'Vietnamese',
        'mediterranean_restaurant': 'Mediterranean',
        'greek_restaurant': 'Greek',
        'spanish_restaurant': 'Spanish',
        'turkish_restaurant': 'Turkish',
        'lebanese_restaurant': 'Lebanese',
        'pizza_restaurant': 'Italian',
        'sushi_restaurant': 'Japanese',
        'barbecue_restaurant': 'American',
        'seafood_restaurant': 'Seafood',
        'steakhouse': 'American',
        'cafe': 'Cafe',
        'bakery': 'Bakery',
    };

    for (const type of types) {
        if (cuisineMap[type]) {
            return cuisineMap[type];
        }
    }

    // Fallback: check if any type contains cuisine keywords
    const typeString = types.join(' ').toLowerCase();
    if (typeString.includes('pizza')) return 'Italian';
    if (typeString.includes('sushi') || typeString.includes('ramen')) {
        return 'Japanese';
    }
    if (typeString.includes('taco') || typeString.includes('burrito')) {
        return 'Mexican';
    }
    if (typeString.includes('curry')) return 'Indian';
    if (typeString.includes('noodle')) return 'Asian';

    return 'Restaurant';
}

/**
 * Convert Google Places price level to dollar signs
 * @param {number} priceLevel - Price level from Google Places (0-4)
 * @return {string} - Dollar sign representation
 */
function convertPriceLevel(priceLevel) {
    switch (priceLevel) {
        case 1: return '$';
        case 2: return '$$';
        case 3: return '$$$';
        case 4: return '$$$$';
        default: return '$$';
    }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @return {number} - Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 10) / 10; // Round to 1 decimal place
}

/**
 * Get photo URL from Google Places photo reference
 * @param {string} photoReference - Photo reference from Google Places
 * @return {string} - Photo URL
 */
function getPhotoUrl(photoReference) {
    if (!photoReference) {
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?' +
            'q=80&w=1000&auto=format&fit=crop';
    }
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=700` +
        `&photo_reference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
}