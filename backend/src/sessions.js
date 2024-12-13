// memoryStorage.js
const { v4: uuidv4 } = require('uuid');

// Shared in-memory storage
const users = new Map(); // User data
const sessions = new Map(); // Active sessions (token -> userId)
const meetings = new Map(); // Meeting data (id -> meeting object)

module.exports = { users, sessions, meetings };
