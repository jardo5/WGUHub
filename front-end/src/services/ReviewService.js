import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/reviews';

// Function to fetch reviews by course code
export const fetchReviewsByCourseCode = async (courseCode) => {
    try {
        const response = await axios.get(`${BASE_URL}/course/${courseCode}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitReview = async (reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/submit`, reviewData);
        return response.data; // You can return the response data if needed
    } catch (error) {
        throw error; // You can throw the error for handling in the component
    }
};

export const verifyReview = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/verify/${token}`);
        return response.data; // You can return any data you need here
    } catch (error) {
        throw error;
    }
};