import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import ManageMeetings from "./pages/ManageMeetings";
import ViewMeetings from "./pages/ViewMeetings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-big-calendar/lib/css/react-big-calendar.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
 
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <ScheduleMeeting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute>
                <ManageMeetings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view"
            element={
              <ProtectedRoute>
                <ViewMeetings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
