import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase'; // You'll need to export functions from your config

export const getNearbyRestaurants = async (userLocation, filters = {}, pageToken = null) => {
    try {
        const getNearbyRestaurantsFunc = httpsCallable(functions, 'getNearbyRestaurants');

        const response = await getNearbyRestaurantsFunc({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            radius: filters.distance * 1609.34, // Convert miles to meters (1 mile = 1609.34 meters)
            includedCuisines: filters.cuisines || [], 
            excludedCuisines: filters.excludedCuisines || [], 
            establishmentType: filters.establishmentType || 'Restaurant',
            pageToken: pageToken, 
        });

        return response.data; // Returns { restaurants, nextPageToken, hasMore }
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

// Get user's current location
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes
            }
        );
    });
};

export const getRestaurantDetails = async (placeId) => {
    try {
        const getDetailsFunc = httpsCallable(functions, 'getRestaurantDetails');
        const response = await getDetailsFunc({ placeId });
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        throw error;
    }
};

export const searchRestaurants = async (query, userLocation) => {
    try {
        const searchFunc = httpsCallable(functions, 'searchRestaurants');
        const response = await searchFunc({
            query,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            radius: 5000
        });
        return response.data.restaurants;
    } catch (error) {
        console.error('Error searching restaurants:', error);
        throw error;
    }
};