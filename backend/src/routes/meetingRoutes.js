const express = require('express');
const router = express.Router();
const MeetingService = require('../services/meetingService');
const authenticateToken = require('../middleware/auth'); // Import middleware

// Protect all meeting routes
router.use(authenticateToken);

router.get('/', (req, res) => {
    try {
        const allMeetings = MeetingService.getAllMeetings();
        res.json(allMeetings);
    } catch (error) {
        console.error('Error fetching all meetings:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Create a new meeting
router.post('/create', (req, res) => {
    try {
        const newMeeting = MeetingService.createMeeting(req.body);
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a meeting
router.put('/:meetingId', (req, res) => {
    try {
        const updatedMeeting = MeetingService.updateMeeting(
            req.params.meetingId,
            req.body
        );
        res.json(updatedMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Cancel a meeting
router.delete('/:meetingId', (req, res) => {
    try {
        const canceledMeeting = MeetingService.cancelMeeting(req.params.meetingId);
        res.json(canceledMeeting);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get user's meetings
router.get('/user/:userId', (req, res) => {
    try {
        const userMeetings = MeetingService.getUserMeetings(req.params.userId);
        res.json(userMeetings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;