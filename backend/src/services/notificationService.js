class NotificationService {
    // Simulate sending meeting scheduled notification
    sendMeetingScheduledNotification(meeting) {
        console.log(`🔔 Notification: Meeting Scheduled
      Meeting ID: ${meeting.id}
      Date: ${meeting.date}
      Time: ${meeting.startTime}
      Participants: ${meeting.participants.join(', ')}`);
    }

    // Simulate sending meeting updated notification
    sendMeetingUpdatedNotification(meeting) {
        console.log(`🔔 Notification: Meeting Updated
      Meeting ID: ${meeting.id}
      New Date: ${meeting.date}
      New Time: ${meeting.startTime}
      Participants: ${meeting.participants.join(', ')}`);
    }

    // Simulate sending meeting canceled notification
    sendMeetingCanceledNotification(meeting) {
        console.log(`🔔 Notification: Meeting Canceled
      Meeting ID: ${meeting.id}
      Participants: ${meeting.participants.join(', ')}`);
    }
}

module.exports = new NotificationService();