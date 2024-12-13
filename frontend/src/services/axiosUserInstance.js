

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://job-scheduling-backend.onrender.com';

const axiosUserInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/users`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosUserInstance;