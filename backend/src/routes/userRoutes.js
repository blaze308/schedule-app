const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create a new user
router.post('/register', UserController.createUser);

// Get user profile
router.get('/:userId', UserController.getUserProfile);

// Update user profile
router.put('/:userId', UserController.updateUserProfile);

// Get user availability
router.get('/:userId/availability', UserController.getUserAvailability);

// Update user availability
router.put('/:userId/availability', UserController.updateUserAvailability);

// Get user's scheduled meetings
router.get('/:userId/meetings', UserController.getUserMeetings);

// Search for freelancers based on skills or other criteria
router.get('/search', UserController.searchUsers);

// Delete user account
router.delete('/:userId', UserController.deleteUser);

router.post('/login', UserController.loginUser);

module.exports = router;