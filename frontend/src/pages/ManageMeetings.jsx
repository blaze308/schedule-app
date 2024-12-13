import React, { useEffect, useState } from 'react';
import { getUserMeetings, cancelMeeting, updateMeeting } from '../services/meetingService';
import MeetingCard from '../components/MeetingCard';

const ManageMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          console.error('User not logged in.');
          return;
        }
        setLoggedInUser(user);

        const data = await getUserMeetings(user.id);
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching meetings:', error.message || error);
      }
    };

    fetchMeetings();
  }, []);

  const validateDateTime = (date, time) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!dateRegex.test(date)) {
      alert('Invalid date format. Use YYYY-MM-DD.');
      return false;
    }
    if (!timeRegex.test(time)) {
      alert('Invalid time format. Use HH:mm:ss.');
      return false;
    }
    return true;
  };

  const handleCancel = async (meetingId) => {
    try {
      await cancelMeeting(meetingId);
      setMeetings(meetings.filter((m) => m.id !== meetingId));
      alert('Meeting canceled successfully.');
    } catch (error) {
      console.error('Error canceling meeting:', error.message || error);
      alert('Failed to cancel meeting.');
    }
  };

  const handleUpdate = async (meetingId) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    const newTime = prompt('Enter new time (HH:mm:ss):');

    if (!newDate || !newTime || !validateDateTime(newDate, newTime)) {
      alert('Update canceled.');
      return;
    }

    try {
      const updatedMeeting = await updateMeeting(meetingId, {
        date: newDate,
        startTime: newTime,
      });

      
      setMeetings(
        meetings.map((m) =>
          m.id === meetingId ? { ...m, ...updatedMeeting } : m
        )
      );
      alert('Meeting updated successfully.');
    } catch (error) {
      console.error('Error updating meeting:', error.message || error);
      alert('Failed to update meeting.');
    }
  };


  const getOtherParticipantName = (participants) => {
    if (!loggedInUser) return 'Unknown';
    const otherParticipantId = participants.find((id) => id !== loggedInUser.id);
    return otherParticipantId || 'Unknown Participant';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Meetings</h1>
      {loggedInUser && (
        <p className="text-lg text-gray-600 mb-6">
          Welcome, <span className="font-semibold">{loggedInUser.firstName} {loggedInUser.lastName}</span>!
        </p>
      )}
      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={{
              ...meeting,
              otherParticipantName: getOtherParticipantName(meeting.participants),
            }}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        ))
      ) : (
        <p className="text-gray-500">No meetings found.</p>
      )}
    </div>
  );
};

export default ManageMeetings;
