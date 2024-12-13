import axiosUserInstance from './axiosUserInstance';

// Create a new user
export const createUser = async (userData) => {
    const response = await axiosUserInstance.post('/register', userData);
    return response.data; // Returns created user data
};

// export const loginUser = async (credentials) => {
//     const response = await axiosUserInstance.post('/login', credentials);
//     return response.data; // Returns token and user info
// };

export const loginUser = async (credentials) => {
    try {
        const response = await axiosUserInstance.post('/login', credentials);
        return response.data; // Returns { token, user } from the backend
    } catch (error) {
        console.error('Error in loginUser:', error); // Log error for debugging
        throw error; // Re-throw the error to handle it in the component
    }
};
