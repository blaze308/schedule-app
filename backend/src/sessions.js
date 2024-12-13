// memoryStorage.js
const { v4: uuidv4 } = require('uuid');

// Shared in-memory storage
const users = new Map();
const sessions = new Map();
const meetings = new Map();

module.exports = { users, sessions, meetings };
