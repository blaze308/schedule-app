import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US'; 
import { getUserMeetings } from '../services/meetingService';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
          console.error('User not logged in.');
          return;
        }

        const userId = loggedInUser.id;
        const meetings = await getUserMeetings(userId);

        const calendarEvents = meetings.map((meeting) => {
          const startDateTime = new Date(`${meeting.date}T${meeting.startTime}`);
          const endDateTime = new Date(startDateTime.getTime() + meeting.duration * 60000); 

          return {
            title: meeting.title || 'Untitled Meeting',
            start: startDateTime,
            end: endDateTime,
          };
        });

        console.log('Calendar Events:', calendarEvents);
        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching meetings:', error.message || error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">View Meetings Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', background: 'white', padding: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

export default CalendarView;
