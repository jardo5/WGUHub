import {jwtDecode} from 'jwt-decode';

export function isAuthenticated() {
    const token = localStorage.getItem('jwtToken');
    let isAuthenticated = !!token;

    if (isAuthenticated) {
        try {
            const decodedToken = jwtDecode(token);
            const isAdmin = decodedToken.role === 'ADMIN';
            isAuthenticated = isAdmin;
        } catch (error) {
            console.error("Token decoding error", error);
            isAuthenticated = false;
        }
    }

    return isAuthenticated;
}
