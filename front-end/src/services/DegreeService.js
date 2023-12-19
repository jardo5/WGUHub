import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/degrees';

// Function to fetch degree names
export const fetchDegreeNames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/names`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
