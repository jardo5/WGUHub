import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/user';

export async function login(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username,
            password,
        });
        const token = response.data;
        localStorage.setItem('jwtToken', token);

        // Decode the token and store the user role
        const decodedToken = jwtDecode(token);
        localStorage.setItem('userRole', decodedToken.role);

        return decodedToken.role;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
}
