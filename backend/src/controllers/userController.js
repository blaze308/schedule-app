const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');

class UserController {
    // Create a new user
    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserService.createUser(userData);

            res.status(201).json({
                message: 'User created successfully',
                user: newUser.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to create user',
                error: error.message
            });
        }
    }

    // Get user profile
    async getUserProfile(req, res) {
        try {
            const { userId } = req.params;
            const user = await UserService.getUserById(userId);

            res.json({
                message: 'User profile retrieved successfully',
                user: user.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                message: 'User not found',
                error: error.message
            });
        }
    }

    // Update user profile
    async updateUserProfile(req, res) {
        try {
            const { userId } = req.params;
            const updateData = req.body;

            const updatedUser = await UserService.updateUser(userId, updateData);

            res.json({
                message: 'User profile updated successfully',
                user: updatedUser.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to update user profile',
                error: error.message
            });
        }
    }

    // Get user availability
    async getUserAvailability(req, res) {
        try {
            const { userId } = req.params;
            const availability = await UserService.getUserAvailability(userId);

            res.json({
                message: 'User availability retrieved successfully',
                availability
            });
        } catch (error) {
            res.status(404).json({
                message: 'Availability not found',
                error: error.message
            });
        }
    }

    // Update user availability
    async updateUserAvailability(req, res) {
        try {
            const { userId } = req.params;
            const availabilityData = req.body;


            const updatedAvailability = await UserService.updateUserAvailability(
                userId,
                availabilityData
            );

            res.json({
                message: 'User availability updated successfully',
                availability: updatedAvailability
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to update availability',
                error: error.message
            });
        }
    }

    // Get user's scheduled meetings
    async getUserMeetings(req, res) {
        try {
            const { userId } = req.params;

            const userMeetings = await UserService.getUserMeetings(userId);

            res.json({
                message: 'User meetings retrieved successfully',
                meetings: userMeetings
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to retrieve user meetings',
                error: error.message
            });
        }
    }

    // Login user
    async loginUser(req, res) {
        try {
            const { email, password } = req.body; // Extract email and password from request body
            const user = await UserService.loginUser(email, password); // Validate credentials

            // Generate a JWT token
            const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

            res.json({
                message: 'Login successful',
                token,
                user: user.toJSON(),
            });
        } catch (error) {
            res.status(401).json({
                message: 'Login failed',
                error: error.message,
            });
        }
    }

    // Search for users (freelancers)
    async searchUsers(req, res) {
        try {
            const searchCriteria = req.query;
            const users = await UserService.searchUsers(searchCriteria);

            res.json({
                message: 'Users found successfully',
                users: users.map(user => user.toJSON()),
                count: users.length
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to search users',
                error: error.message
            });
        }
    }

    // Delete user account
    async deleteUser(req, res) {
        try {
            const { userId } = req.params;

            await UserService.deleteUser(userId);

            res.json({
                message: 'User account deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to delete user account',
                error: error.message
            });
        }
    }
}

module.exports = new UserController();