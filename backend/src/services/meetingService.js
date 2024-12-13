const { meetings } = require('../sessions');
const NotificationService = require('./notificationService');
const Meeting = require('../models/Meeting');

class MeetingService {
    // Create a new meeting
    createMeeting(meetingData) {
        const meeting = new Meeting(meetingData);

        // Validate meeting
        meeting.validate();

        // Check for conflicts
        this.checkSchedulingConflicts(meeting);

        // Save meeting
        meetings.set(meeting.id, meeting);

        // Send notifications
        NotificationService.sendMeetingScheduledNotification(meeting);

        return meeting;
    }

    // Update an existing meeting
    updateMeeting(meetingId, updateData) {
        const meeting = meetings.get(meetingId);

        if (!meeting) {
            throw new Error('Meeting not found');
        }

        // Create updated meeting object
        const updatedMeeting = new Meeting({
            ...meeting,
            ...updateData
        });

        // Validate updated meeting
        updatedMeeting.validate();

        // Check for conflicts
        this.checkSchedulingConflicts(updatedMeeting);

        // Update the meeting
        meetings.set(meetingId, updatedMeeting);

        // Send notifications
        NotificationService.sendMeetingUpdatedNotification(updatedMeeting);

        return updatedMeeting;
    }

    // Cancel a meeting
    cancelMeeting(meetingId) {
        const meeting = meetings.get(meetingId);

        if (!meeting) {
            throw new Error('Meeting not found');
        }

        // Remove the meeting
        meetings.delete(meetingId);

        // Send notifications
        NotificationService.sendMeetingCanceledNotification(meeting);

        return meeting;
    }

    // Check for scheduling conflicts
    checkSchedulingConflicts(newMeeting) {
        for (const meeting of meetings.values()) {
            if (
                meeting.id !== newMeeting.id &&
                meeting.date === newMeeting.date &&
                meeting.startTime === newMeeting.startTime &&
                meeting.participants.some(p => newMeeting.participants.includes(p))
            ) {
                throw new Error('Scheduling conflict: Meeting already exists at this time');
            }
        }
    }

    // Get meetings for a user
    getUserMeetings(userId) {
        return Array.from(meetings.values()).filter(meeting =>
            meeting.participants.includes(userId)
        );
    }

    // Get all meetings
    getAllMeetings() {
        return Array.from(meetings.values());
    }
}

module.exports = new MeetingService();
