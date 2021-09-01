// Este objetos se lo pasamos al <Calendar /> en el componente <CalendarScreen />
// para cambiar las lapabras de este que por defecto vienen en ingles
export const messages = {
   allDay: 'Todo el día',
   previous: '<',
   next: '>',
   today: 'Hoy',
   month: 'Mes',
   week: 'Semana',
   day: 'Día',
   agenda: 'Agenda',
   date: 'Fecha',
   time: 'Hora',
   event: 'Evento',
   noEventsInRange: 'No hay eventos en este rango',
   showMore: (total) => `+ Ver más (${total})`,
};
