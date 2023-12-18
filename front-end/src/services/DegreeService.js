import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/degrees';

// Function to fetch degree names
export const fetchDegreeNames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/names`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
