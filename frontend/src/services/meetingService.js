import axiosInstance from './axiosInstance';

// Helper function to get the token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in.');
    }
    return {
        Authorization: `Bearer ${token}`, // Attach token
    };
};

// Create a new meeting
export const createMeeting = async (meetingDetails) => {
    const response = await axiosInstance.post('/create', meetingDetails, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Update an existing meeting
export const updateMeeting = async (meetingId, updates) => {
    const response = await axiosInstance.put(`/${meetingId}`, updates, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Cancel a meeting
export const cancelMeeting = async (meetingId) => {
    const response = await axiosInstance.delete(`/${meetingId}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Get meetings for a specific user
export const getUserMeetings = async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};
