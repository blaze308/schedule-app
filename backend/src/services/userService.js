
const User = require('../models/User'); // Assuming User model exists in models/User.js
const bcrypt = require('bcrypt'); // For hashing and comparing passwords

// Simulated in-memory database for users
const users = new Map();

class UserService {
    // Create a new user
    static async createUser(userData) {
        // Ensure password is provided
        if (!userData.password || userData.password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.passwordHash = hashedPassword; // Add the hashed password to userData

        // Create the user
        const newUser = new User(userData);
        newUser.validate(); // Validate user data (ensures all required fields are present)

        // Save to in-memory database
        users.set(newUser.id, newUser);
        return newUser;
    }

    // Login a user
    static async loginUser(email, password) {
        // Find user by email
        const user = Array.from(users.values()).find((u) => u.email === email);
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password.');
        }

        return user; // Return the authenticated user
    }

    // Get a user by ID
    static async getUserById(userId) {
        const user = users.get(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Update user profile
    static async updateUser(userId, updateData) {
        const user = await this.getUserById(userId);

        // Update only allowed fields
        const allowedUpdates = ['firstName', 'lastName', 'phoneNumber', 'skills', 'professionalTitle', 'hourlyRate'];
        Object.entries(updateData).forEach(([key, value]) => {
            if (allowedUpdates.includes(key)) {
                user[key] = value;
            }
        });

        user.validate(); // Ensure updated data is valid
        users.set(userId, user); // Save updated user to in-memory database
        return user;
    }

    // Get user availability
    static async getUserAvailability(userId) {
        const user = await this.getUserById(userId);
        return user.availability;
    }

    // Update user availability
    static async updateUserAvailability(userId, availabilityData) {
        const user = await this.getUserById(userId);
        user.availability = { ...user.availability, ...availabilityData }; // Merge new availability data
        users.set(userId, user); // Save updated user to in-memory database
        return user.availability;
    }

    // Get user meetings
    static async getUserMeetings(userId) {
        const user = await this.getUserById(userId);
        return user.scheduledMeetings;
    }

    // Search for users based on criteria
    static async searchUsers(criteria) {
        const results = Array.from(users.values()).filter((user) => {
            // Match criteria with user properties (e.g., skills, userType, etc.)
            return Object.entries(criteria).every(([key, value]) => {
                if (key in user) {
                    return user[key].toString().toLowerCase().includes(value.toLowerCase());
                }
                return false;
            });
        });

        return results;
    }

    // Delete a user account
    static async deleteUser(userId) {
        if (!users.has(userId)) {
            throw new Error('User not found');
        }
        users.delete(userId); // Remove user from in-memory database
    }
}

module.exports = UserService;
