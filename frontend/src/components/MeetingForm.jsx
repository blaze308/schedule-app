import React, { useState, useEffect } from 'react';
import { createMeeting } from '../services/meetingService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    title: '', // Add the title field
    participants: ['', ''], // Array for two participants
    date: null, // Date in YYYY-MM-DD format
    startTime: '', // Start time in HH:mm:ss format
    duration: '', // Duration in minutes
  });

  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user's info
  const [errors, setErrors] = useState({}); // Validation errors

  useEffect(() => {
    // Fetch logged-in user details from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedInUser(user); // Store logged-in user info
      setFormData((prevFormData) => ({
        ...prevFormData,
        participants: [user.id, ''], // Pre-fill the first participant with user ID
      }));
    }
  }, []);

  const validateTime = (time) => {
    // Validate time in HH:mm:ss format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      // Update specific participant
      const updatedParticipants = [...formData.participants];
      updatedParticipants[index] = e.target.value;
      setFormData({ ...formData, participants: updatedParticipants });
    } else {
      const { name, value } = e.target;

      // Validate time field dynamically
      if (name === 'startTime' && !validateTime(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startTime: 'Invalid time format. Use HH:mm:ss.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { [name]: removedError, ...restErrors } = prevErrors; // Remove specific field error if valid
          return restErrors;
        });
      }

      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, date: dayjs(newValue).format('YYYY-MM-DD') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation for time before submitting
    if (!validateTime(formData.startTime)) {
      setErrors({ startTime: 'Invalid time format. Use HH:mm:ss.' });
      return;
    }

    try {
      // Ensure payload matches backend expectations
      const payload = {
        title: formData.title, // Include title in payload
        participants: formData.participants, // IDs of participants
        date: formData.date,
        startTime: formData.startTime,
        duration: parseInt(formData.duration, 10),
      };

      const newMeeting = await createMeeting(payload);
      alert('Meeting Scheduled Successfully!');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to schedule meeting.';
      const detailedError =
        error.response?.data?.error || 'Unknown error occurred.';
      alert(`${errorMessage}\nDetails: ${detailedError}`);
      console.error('Error creating meeting:', error.response?.data || error.message);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white p-6 shadow rounded space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">Schedule a Meeting</h2>

      <div>
        <TextField
          label="Meeting Title"
          name="title"
          value={formData.title} // Bind title to formData
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
        />
      </div>

      <div>
        <TextField
          label="You"
          value={loggedInUser?.firstName || 'Loading...'} // Display the logged-in user's name
          variant="outlined"
          fullWidth
          disabled // Disable editing for logged-in user's name
        />
      </div>

      <div>
        <TextField
          label="Participant Name"
          value={formData.participants[1]} // Allow editing the second participant ID
          onChange={(e) => handleInputChange(e, 1)}
          variant="outlined"
          fullWidth
          required
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Meeting Date"
          value={formData.date ? dayjs(formData.date) : null}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} fullWidth required />}
        />
      </LocalizationProvider>

      <div>
        <TextField
          label="Start Time (HH:mm:ss)"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          placeholder="10:00:00"
          error={!!errors.startTime}
          helperText={errors.startTime || ''}
        />
      </div>

      <div>
        <TextField
          label="Duration (minutes)"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          type="number"
        />
      </div>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Schedule Meeting
      </Button>
    </form>
  );
};

export default MeetingForm;
