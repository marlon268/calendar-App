import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';
import { prepateEvets } from '../../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
   return async (dispatch, getState) => {
      const { uid, name } = getState().auth;

      try {
         const resp = await fetchConToken('events', event, 'POST');
         const body = await resp.json();

         if (body.ok) {
            event.id = body.event.id;
            event.user = {
               _id: uid,
               name,
            };
            console.log(event);
            dispatch(eventAddNew(event));
         }
      } catch (error) {
         console.log(error);
      }
   };
};

const eventAddNew = (event) => ({
   type: types.eventAddNew,
   payload: event,
});

export const eventSetActive = (event) => ({
   type: types.eventSetAddNew,
   payload: event,
});

export const eventClearActiveEvent = () => ({
   type: types.eventClearActiveEvent,
});

export const eventStartUpdate = (event) => {
   return async (dispatch) => {
      try {
         console.log(event);
         const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
         const body = await resp.json();
         console.log(body);
         if (body.ok) {
            dispatch(eventUpdated(event));
         } else {
            Swal.fire('Error', body.msg, 'error');
         }
      } catch (error) {
         console.log(error);
      }
   };
};

const eventUpdated = (event) => ({
   type: types.eventUpdated,
   payload: event,
});

export const eventStartDelete = () => {
   return async (dispatch, getState) => {
      const { id } = getState().calendar.activeEvent;

      try {
         const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
         const body = await resp.json();
         console.log(body);
         if (body.ok) {
            dispatch(eventDeleted());
         } else {
            Swal.fire('Error', body.msg, 'error');
         }
      } catch (error) {
         console.log(error);
      }
   };
};

const eventDeleted = () => ({
   type: types.eventDeleted,
});

export const eventStartLoading = () => {
   return async (dispatch) => {
      try {
         const resp = await fetchConToken('events');
         const body = await resp.json();
         const events = prepateEvets(body.events);

         dispatch(eventLoader(events));
      } catch (error) {
         console.log(error);
      }
   };
};

const eventLoader = (events) => ({
   type: types.eventLoader,
   payload: events,
});

export const eventLogout = () => ({
   type: types.eventLogout,
});
