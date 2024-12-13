const { v4: uuidv4 } = require('uuid');

class User {
    constructor(data) {
        // Unique identifier for the user
        this.id = data.id || uuidv4();

        // Basic user information
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;

        // User type and profile details
        this.userType = data.userType; // 'freelancer' or 'client'
        this.profileCompleted = data.profileCompleted || false;

        // Professional information (for freelancers)
        this.skills = data.skills || [];
        this.professionalTitle = data.professionalTitle;
        this.hourlyRate = data.hourlyRate;

        // Location and availability
        this.timeZone = data.timeZone || 'UTC';
        this.availability = {
            workHours: data.availability?.workHours || {
                monday: { start: '09:00', end: '17:00' },
                tuesday: { start: '09:00', end: '17:00' },
                wednesday: { start: '09:00', end: '17:00' },
                thursday: { start: '09:00', end: '17:00' },
                friday: { start: '09:00', end: '17:00' }
            },
            blockedSlots: data.availability?.blockedSlots || []
        };

        // Authentication and security
        this.passwordHash = data.passwordHash;
        this.salt = data.salt;

        // Account metadata
        this.createdAt = data.createdAt || new Date();
        this.lastLogin = data.lastLogin;

        // Meeting-related information
        this.scheduledMeetings = data.scheduledMeetings || [];
    }

    // Validate user data
    validate() {
        // Basic validation checks
        if (!this.firstName || !this.lastName) {
            throw new Error('First and last name are required');
        }

        if (!this.email || !this.email.includes('@')) {
            throw new Error('Valid email is required');
        }

        if (!['freelancer', 'client'].includes(this.userType)) {
            throw new Error('User type must be either freelancer or client');
        }

        if (!this.passwordHash) {
            throw new Error('Password is required and must be hashed.');
        }

        return true;
    }

    // Add a scheduled meeting to user's meetings
    addScheduledMeeting(meetingId) {
        if (!this.scheduledMeetings.includes(meetingId)) {
            this.scheduledMeetings.push(meetingId);
        }
    }

    // Remove a scheduled meeting
    removeScheduledMeeting(meetingId) {
        this.scheduledMeetings = this.scheduledMeetings.filter(
            id => id !== meetingId
        );
    }

    // Check if user is available at a specific time
    isAvailableAtTime(date, startTime, duration) {
        // Convert date and times to appropriate format
        const meetingDate = new Date(date);
        const dayOfWeek = meetingDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

        // Check if the day is in work hours
        const workHours = this.availability.workHours[dayOfWeek];
        if (!workHours) return false;

        // Check against blocked slots
        const isBlockedSlot = this.availability.blockedSlots.some(slot =>
            slot.date === date &&
            slot.startTime === startTime
        );
        if (isBlockedSlot) return false;

        return true;
    }

    // Convert to plain object for serialization
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            userType: this.userType,
            skills: this.skills,
            professionalTitle: this.professionalTitle,
            timeZone: this.timeZone,
            scheduledMeetings: this.scheduledMeetings
        };
    }
}

module.exports = User;