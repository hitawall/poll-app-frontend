import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptors remain the same
axiosInstance.interceptors.request.use(request => {
    console.log("Request URL:", request.url);
    const publicPaths = ['/login', '/signup'];
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
