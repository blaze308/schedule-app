const { v4: uuidv4 } = require('uuid');

class Meeting {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.title = data.title || 'Untitled Meeting'; // Default title
        this.participants = data.participants || [];
        this.date = data.date;
        this.startTime = data.startTime;
        this.duration = data.duration;
        this.status = data.status || 'scheduled';
        this.createdAt = new Date();
    }

    // Validate meeting data
    validate() {
        if (!this.participants || this.participants.length !== 2) {
            throw new Error('Meeting must have exactly 2 participants');
        }

        if (!this.date || !this.startTime || !this.duration) {
            throw new Error('Date, start time, and duration are required');
        }

        if (!this.title || typeof this.title !== 'string') {
            throw new Error('Title is required and must be a string');
        }

        return true;
    }

    // Convert to plain object for serialization
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            participants: this.participants,
            date: this.date,
            startTime: this.startTime,
            duration: this.duration,
            status: this.status,
            createdAt: this.createdAt
        };
    }
}

module.exports = Meeting;
