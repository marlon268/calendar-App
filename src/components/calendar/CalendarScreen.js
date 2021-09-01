import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../redux/actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
   eventClearActiveEvent,
   eventSetActive,
} from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// Con esto cambiamos el idioma del calendario a español, ya que
// este se adapta al idioma establecido por moment
moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
   const [lastView, setLastView] = useState(
      localStorage.getItem('lastView') || 'month'
   );

   const dispatch = useDispatch();
   const { events, activeEvent } = useSelector((state) => state.calendar);

   const onDoubleClick = (e) => {
      dispatch(uiOpenModal());
   };

   const onSelectEvent = (e) => {
      dispatch(eventSetActive(e));
   };

   const onViewChange = (e) => {
      setLastView(e);
      localStorage.setItem('lastView', e);
   };

   const onSelectSlot = (e) => {
      dispatch(eventClearActiveEvent());
   };

   // Esta funcion personaliza los eventos del calendario
   const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
         backgroundColor: '#367CF7',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white',
      };

      return {
         style,
      };
   };

   return (
      <div className="calendar-screen">
         <Navbar />

         <Calendar
            messages={messages}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView}
            components={{
               event: CalendarEvent,
            }}
         />
         <AddNewFab />

         {activeEvent && <DeleteEventFab />}

         <CalendarModal />
      </div>
   );
};
