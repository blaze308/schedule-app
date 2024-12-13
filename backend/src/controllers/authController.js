const { users, sessions } = require('../db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // For hashing passwords (install with `npm install bcrypt`)

// Register a new user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;

    if (!firstName || !lastName || !email || !password || !userType) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user already exists
    if ([...users.values()].some((user) => user.email === email)) {
        return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create and store the new user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        userType,
        passwordHash: hashedPassword,
        scheduledMeetings: [],
    };

    users.set(newUser.id, newUser);
    res.status(201).json({ message: 'User registered successfully.' });
};

// Login an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = [...users.values()].find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a session token
    const token = uuidv4();
    sessions.set(token, user.id);

    res.json({ message: 'Login successful.', token });
};

// Middleware to protect routes
exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required.' });
    }

    const userId = sessions.get(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    req.userId = userId; // Attach userId to the request object for further use
    next();
};
