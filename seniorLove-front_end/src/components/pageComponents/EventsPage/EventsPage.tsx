import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../../../axios';
import EventSticker from '../../standaloneComponents/EventSticker/EventSticker';
import { IEvent } from '../../../@types/IEvent';
import Loader from '../../standaloneComponents/Loader/Loader';
import Error500Page from '../ErrorPages/Error500Page';
import { removeTokenFromLocalStorage } from '../../../localStorage/localStorage';
import DefaultBtn from '../../standaloneComponents/Button/DefaultBtn';

interface EventsPageProps {
  isAuthenticated: boolean;
}

export default function EventsPage({ isAuthenticated }: EventsPageProps) {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // State for setting events
  const [events, setEvents] = useState<IEvent[]>([]);
  // State for setting loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for setting error state
  const [serverError, setServerError] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Fetch events and set state
  useEffect(() => {
    const fetchAndSaveEvents = async () => {
      try {
        const result = await axios.get('/public/events');
        setEvents(result.data);
      } catch (e) {
        console.error(e);
        if (
          e instanceof AxiosError &&
          (e.response?.data.blocked || e.response?.status === 401)
        ) {
          removeTokenFromLocalStorage();
          navigate('/loggedOut');
        } else {
          setServerError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSaveEvents();
  }, [navigate]);

  // If server error, display 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  return (
    <main className="w-full min-h-screen flex-grow flex flex-col justify-start items-center bg-primaryGrey text-primaryText pb-8 gap-8">
      <p className="text-sm text-center font-medium md:text-xl my-4 w-9/12 pt-8">
        Bienvenue sur la page dédiée aux{' '}
        <span className="text-secondaryPink">évènements</span> que nous
        organisons ! Découvrez une sélection d&apos;activités et
        d&apos;événements qui se dérouleront prochainement dans notre
        communauté. Que vous soyez amateur de culture, passionné de sport, ou
        simplement à la recherche d&apos;une sortie en plein air, il y en a pour
        tous les goûts!
      </p>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-10 justify-center content-around w-10/12">
          {events.map((event) => (
            <EventSticker event={event} key={event.name} />
          ))}
        </div>
      )}

      {!isAuthenticated && (
        <>
          <Link to="/">
            <DefaultBtn btnText="Inscrivez-vous" btnType="button" />
          </Link>

          <div className="connexion_paragraph text-center text-base mb-4">
            <p>
              Deja membre? Connectez-vous{' '}
              <Link to="/login" className="text-secondaryPink">
                ici
              </Link>
              .
            </p>
          </div>
        </>
      )}
    </main>
  );
}
