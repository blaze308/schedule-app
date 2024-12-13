import React from 'react';
import Button from '@mui/material/Button';

const MeetingCard = ({ meeting, onUpdate, onCancel }) => {
  const meetingWith = meeting.participants[1] || 'Unknown';

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">{meeting.title}</h3>
      <p>Date: {meeting.date}</p>
      <p>Start Time: {meeting.startTime}</p>
      <p>Duration: {meeting.duration} minutes</p>
      <p>Status: {meeting.status}</p>
      <p>
        <strong>Meeting with:</strong> {meetingWith}
      </p>
      <div className="mt-4 flex gap-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onUpdate(meeting.id)}
        >
          Reschedule
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onCancel(meeting.id)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default MeetingCard;
