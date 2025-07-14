import React from 'react';
import events from '../mock/events';

const HomeCalendar = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">Próximos Eventos</h3>
      {events.length === 0 ? (
        <p className="text-gray-500">No hay eventos próximos.</p>
      ) : (
        <div className="space-y-3">
          {events.slice(0, 3).map(event => ( // Show only first 3 events
            <div key={event.id} className="border-l-4 border-orange-400 pl-3">
              <p className="font-medium text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-600">{event.date} a las {event.time}</p>
              <p className="text-xs text-gray-500">{event.location}</p>
            </div>
          ))}
          {events.length > 3 && (
            <button className="w-full text-orange-500 font-medium mt-2 hover:underline">Ver más eventos</button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeCalendar;