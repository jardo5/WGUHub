import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/courses';

// Function to fetch courses by degree and search term
export const fetchCourses = async (degreeId, searchTerm, from, to) => {
    try {
        let url = BASE_URL;

        // If a degree is selected, filter by degreeId
        if (degreeId) {
            url += `/byDegree?degreeId=${degreeId}`;
        }

        // Add search term if available
        if (searchTerm) {
            url += `&searchTerm=${searchTerm}`;
        }

        const response = await axios.get(url);
        return response.data.slice(from, to);
    } catch (error) {
        throw error;
    }
};

// Function to search courses by term
export const searchCourses = async (term, limit) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?searchTerm=${term}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch a course by course code
export const fetchCourseByCourseCode = async (courseCode) => {
    try {
        const response = await axios.get(`${BASE_URL}/code/${courseCode}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
