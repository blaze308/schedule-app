import React from 'react';
import MeetingForm from '../components/MeetingForm';

const ScheduleMeeting = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Schedule a New Meeting</h1>
      <MeetingForm />
    </div>
  );
};

export default ScheduleMeeting;
