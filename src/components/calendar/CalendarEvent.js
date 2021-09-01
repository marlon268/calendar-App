import React from 'react';

// Recibe todo el evento
export const CalendarEvent = ({ event }) => {
   const { title, user } = event;

   return (
      <div>
         <strong>{title}</strong>
         <span> - {user.name}</span>
      </div>
   );
};
