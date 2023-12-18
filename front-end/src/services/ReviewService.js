import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reviews';

// Function to fetch reviews by course code
export const fetchReviewsByCourseCode = async (courseCode) => {
    try {
        const response = await axios.get(`${BASE_URL}/course/${courseCode}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};