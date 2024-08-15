// utils/geocoding.js
import axios from 'axios';

// Elige una de las siguientes opciones según la API que prefieras usar.

// **Opción 1: OpenCage**
const OPENCAGE_API_KEY = '7f37f3998c7d4d6091f2ec786c996f89'; // Reemplaza con tu clave API
const OPENCAGE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

export const getCoordinatesFromAddress = async (address) => {
    try {
        const response = await axios.get(OPENCAGE_API_URL, {
            params: {
                q: address,
                key: OPENCAGE_API_KEY,
            },
        });

        const results = response.data.results;
        if (results.length > 0) {
            const location = results[0].geometry;
            return {
                latitude: location.lat,
                longitude: location.lng,
            };
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

// **Opción 2: Nominatim**
/*
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

export const getCoordinatesFromAddress = async (address) => {
    try {
        const response = await axios.get(NOMINATIM_API_URL, {
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
            },
        });

        const results = response.data;
        if (results.length > 0) {
            const location = results[0];
            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon),
            };
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
*/
