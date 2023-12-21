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

// Function to submit a review
export const submitReview = async (reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/submit`, reviewData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to verify a review
export const verifyReview = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/verify/${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a review
export const updateReview = async (reviewId, reviewData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${reviewId}`, reviewData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteReviewSend = async (reviewId) => {
    try {
        await axios.delete(`${BASE_URL}/${reviewId}`);
    } catch (error) {
        throw error;
    }
};

