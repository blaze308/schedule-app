const express = require('express');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');  // Import meeting routes
const userRoutes = require('./routes/userRoutes');        // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        const allowedOrigins = [
            'http://localhost:5173',
            'https://react-schedule-app.netlify.app',
        ];

        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Use the routes for meetings and users
app.use('/api/meetings', meetingRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({
        message: 'Job Matching Scheduling API',
        status: 'Running'
    });
});

// Start server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT}`);
    });
};

// Only start server if run directly (not during testing)
if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };
