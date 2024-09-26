import { Link } from 'react-router-dom';
import { IEvent } from '../../../@types/IEvent';
import { extractDayMonth } from '../../../utils/dateAndTimeUtils';
import CalendarIcon from '../Icon/CalendarIcon';

interface EventStickerProps {
  event: IEvent;
  page?: string;
}

export default function EventSticker({ event, page }: EventStickerProps) {
  // Extract day and month from event date
  const extractedDate = extractDayMonth(event.date);

  return (
    <div className={page === 'profile' ? 'pt-4 md:pt-0' : 'mx-auto'}>
      <Link to={`/events/${event.id}`} className="h-72 w-72">
        <div
          className={`rounded-xl shadow-2xl relative ${page === 'profile' ? 'h-36 w-36' : 'h-72 w-72'}`}
        >
          <div
            className={`absolute -right-5 -top-8 ${page === 'profile' ? '-right-4 -top-4' : ''}`}
          >
            <CalendarIcon extractedDate={extractedDate} page={page} />
          </div>

          <div className="m-2 w-fit absolute top-0 left-1 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl font-medium">
            {event.location}
          </div>

          <img
            src={event.picture_url}
            alt={event.name}
            className={`object-cover rounded-xl ${page === 'profile' ? 'h-36 w-36' : 'h-72 w-72'}`}
          />

          <div
            className={`m-2 w-fit absolute bottom-0 left-1 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-medium ${page === 'profile' ? 'text-md' : 'text-2xl'}`}
          >
            {event.name}
          </div>
        </div>
      </Link>
    </div>
  );
}
