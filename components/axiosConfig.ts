import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(request => {
    console.log("Request URL:", request.url);
    const publicPaths = ['/login', '/signup']; // List of paths that should not include the token
    const token = localStorage.getItem('token');
    if (token && !publicPaths.includes(request.url)) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
});


axiosInstance.interceptors.response.use(response => response, error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
});

export default axiosInstance;
