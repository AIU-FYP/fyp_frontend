import axios from 'axios';

export function isAuthenticated() {
    const accessToken = useCookie('access_token').value;  // Retrieve the token from cookie
    console.log("Access Token:", accessToken);  // For debugging
    return Boolean(accessToken);  // Return true if the token exists
}

// Define your axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001',  // Mock API URL
});

// Login function to authenticate user and retrieve tokens
export async function login(username, password) {
    const response = await api.get(`/users?username=${username}&password=${password}`);

    if (response.data.length) {
        const { access_token, refresh_token } = response.data[0];
        useCookie('access_token').value = access_token;  // Store access token
        useCookie('refresh_token').value = refresh_token;  // Store refresh token
        return response.data[0];  // Return user data
    } else {
        throw new Error("Invalid credentials");
    }
}

// Optional: Logout function to clear cookies
export function logout() {
    useCookie('access_token').value = null;
    useCookie('refresh_token').value = null;
}
