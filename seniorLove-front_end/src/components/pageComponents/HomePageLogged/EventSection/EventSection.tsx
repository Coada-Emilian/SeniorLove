import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../../../../axios';
import { IEvent } from '../../../../@types/IEvent';
import EventSticker from '../../../standaloneComponents/EventSticker/EventSticker';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import Loader from '../../../standaloneComponents/Loader/Loader';
import Error500Page from '../../ErrorPages/Error500Page';
import { removeTokenFromLocalStorage } from '../../../../localStorage/localStorage';

export default function EventSection() {
  // State to store events
  const [events, setEvents] = useState<IEvent[]>([]);
  // State to store number of events to display
  const [numEvents, setNumEvents] = useState(3);
  // State to store loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to store server error status
  const [serverError, setServerError] = useState(false);

  // Hook to navigate to other pages
  const navigate = useNavigate();

  // Check window size to adapt number of events on screen
  useEffect(() => {
    const updateNumEvents = () => {
      // Set number of events to display based on window width
      if (window.innerWidth >= 1280) {
        setNumEvents(8);
      } else if (window.innerWidth >= 1024) {
        setNumEvents(6);
      } else if (window.innerWidth >= 640) {
        setNumEvents(4);
      } else {
        setNumEvents(3);
      }
    };
    // Set initial value
    updateNumEvents();
    // Update on resize
    window.addEventListener('resize', updateNumEvents);
    // Remove event listener on unmount
    return () => window.removeEventListener('resize', updateNumEvents);
  }, []);

  useEffect(() => {
    // Fetch events from server and save them to state
    const fetchAndSaveEvents = async () => {
      try {
        // Get events from server
        const result = await axios.get('/public/events');
        setEvents(result.data);
      } catch (e) {
        console.log(e);
        if (
          e instanceof AxiosError &&
          (e.response?.data.blocked || e.response?.status === 401)
        ) {
          // If user is blocked or unauthorized, log out
          removeTokenFromLocalStorage();
          navigate('/loggedOut');
        } else {
          setServerError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    // Run fetch function
    fetchAndSaveEvents();
  }, [navigate]);

  // Display error page
  if (serverError) {
    return <Error500Page />;
  }
  // Display loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center mx-auto w-11/12 pb-8">
        {events.slice(0, numEvents).map((event) => (
          <EventSticker event={event} key={event.name} />
        ))}
      </div>
      
      <Link to="/events">
        <DefaultBtn btnText="Voir plus d'évènements" />
      </Link>
    </div>
  );
}
