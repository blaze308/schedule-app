const MeetingService = require('../services/meetingService');

class MeetingController {
    // Create a new meeting
    async createMeeting(req, res) {
        try {
            // Extract meeting data from request body
            const meetingData = req.body;

            // Optional: Add user authentication context if available
            if (req.user) {
                // Ensure the creating user is part of the participants
                if (!meetingData.participants.includes(req.user.id)) {
                    meetingData.participants.push(req.user.id);
                }
            }

            // Call service to create meeting
            const newMeeting = MeetingService.createMeeting(meetingData);

            // Respond with created meeting and 201 status
            res.status(201).json({
                message: 'Meeting created successfully',
                meeting: newMeeting
            });
        } catch (error) {
            // Handle validation or conflict errors
            res.status(400).json({
                message: 'Failed to create meeting - possible conflict',
                error: error.message
            });
        }
    }

    // Update an existing meeting
    async updateMeeting(req, res) {
        try {
            const { meetingId } = req.params;
            const updateData = req.body;

            // Optional: Add user authorization check
            // This would typically involve checking if the user has permission to update the meeting
            const updatedMeeting = MeetingService.updateMeeting(meetingId, updateData);

            res.json({
                message: 'Meeting updated successfully',
                meeting: updatedMeeting
            });
        } catch (error) {
            // Handle not found or validation errors
            res.status(error.message.includes('not found') ? 404 : 400)
                .json({
                    message: 'Failed to update meeting',
                    error: error.message
                });
        }
    }

    // Cancel a meeting
    async cancelMeeting(req, res) {
        try {
            const { meetingId } = req.params;

            // Optional: Add user authorization check
            const canceledMeeting = MeetingService.cancelMeeting(meetingId);

            res.json({
                message: 'Meeting canceled successfully',
                meeting: canceledMeeting
            });
        } catch (error) {
            // Handle not found errors
            res.status(404).json({
                message: 'Failed to cancel meeting',
                error: error.message
            });
        }
    }

    // Get meetings for a specific user
    async getUserMeetings(req, res) {
        try {
            const { userId } = req.params;

            // Optional: Add authentication to ensure user can only fetch their own meetings
            // if (req.user.id !== userId && !req.user.isAdmin) {
            //     return res.status(403).json({ message: 'Unauthorized access' });
            // }

            const userMeetings = MeetingService.getUserMeetings(userId);

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
}

module.exports = new MeetingController();