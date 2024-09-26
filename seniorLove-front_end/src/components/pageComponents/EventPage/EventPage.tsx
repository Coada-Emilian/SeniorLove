import { useState, useEffect } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import axios from '../../../axios';
import { IEvent } from '../../../@types/IEvent';
import DefaultBtn from '../../standaloneComponents/Button/DefaultBtn';
import Loader from '../../standaloneComponents/Loader/Loader';
import { removeTokenFromLocalStorage } from '../../../localStorage/localStorage';
import { displayFullDate, formatTime } from '../../../utils/dateAndTimeUtils';
import Error500Page from '../ErrorPages/Error500Page';

interface EventPageProps {
  isAuthenticated: boolean;
}

export default function EventPage({ isAuthenticated }: EventPageProps) {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // State for setting event infos
  const [event, setEvent] = useState<IEvent | null>(null);
  // State for setting user events
  const [userEvents, setUserEvents] = useState<IEvent[]>([]);
  // State for setting if user is subscribed to event
  const [isSubscribed, setIsSubscribed] = useState<boolean>();
  // State for setting button text
  const [buttonText, setButtonText] = useState<string>('');
  // State for setting loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for setting error state
  const [isError, setIsError] = useState<number | null>(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Toast notifications
  const subNotify = () =>
    toast.success('Vous êtes bien inscrit(e) à cet événement', {
      autoClose: 3000,
    });

  const unsubNotify = () =>
    toast.info("Vous n'êtes plus inscrit(e) à cet événement", {
      autoClose: 3000,
    });

  // Get id from url
  const { id } = useParams();

  // Fetch event infos and set state
  useEffect(() => {
    const getEvent = async () => {
      try {
        const result = await axios.get(`public/events/${id}`);
        setEvent(result.data);
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 404) {
          console.error(e);
          setIsError(404);
        } else {
          setIsError(500);
          console.error(e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getEvent();
  }, [id]);

  // Fetch user events infos and set state
  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const result = await axios.get('private/users/me');
        setUserEvents(result.data.events);

        // Check if user is subscribed after the user events are fetched
        const checkSubscribeStatus = userEvents.some(
          (event: IEvent) => event.id === Number(id)
        );
        // If event is set, check if user is subscribed to event
        if (event) {
          if (checkSubscribeStatus) {
            setIsSubscribed(true);
            setButtonText('Me désinscrire');
          } else {
            setIsSubscribed(false);
            setButtonText('Je participe');
          }
        }
      } catch (e) {
        console.error(e);
        if (
          e instanceof AxiosError &&
          (e.response?.data.blocked || e.response?.status === 401)
        ) {
          removeTokenFromLocalStorage();
          navigate('/loggedOut');
        } else {
          setIsError(500);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // If user is authenticated, fetch events infos
    if (isAuthenticated) {
      getUserEvents();
    }
  }, [event, isAuthenticated, isSubscribed, navigate]);

  // Function to subscribe to an event
  async function subscribeToEvent(eventId: number) {
    try {
      const response = await axios.put(`/private/events/${eventId}/register`);
      if (response.status === 204) {
        setIsSubscribed(true);
        subNotify();
      } else {
        console.log(response);
        setIsError(500);
      }
    } catch (e) {
      console.error(e);
      if (
        e instanceof AxiosError &&
        (e.response?.data.blocked || e.response?.status === 401)
      ) {
        removeTokenFromLocalStorage();
        navigate('/loggedOut');
      } else {
        setIsError(500);
      }
    }
  }

  // Function to unsubscribe from an event
  async function unsubscribeFromEvent(eventId: number) {
    try {
      await axios.delete(`/private/events/${eventId}/unregister`);
      setIsSubscribed(false);
      unsubNotify();
    } catch (e) {
      console.error(e);
      if (
        e instanceof AxiosError &&
        (e.response?.data.blocked || e.response?.status === 401)
      ) {
        removeTokenFromLocalStorage();
        navigate('/loggedOut');
      } else {
        setIsError(500);
      }
    }
  }
  // If error, display error page
  if (isError === 500) {
    return <Error500Page />;
  } else if (isError === 404) {
    return <Navigate to="*" />;
  }

  // If loading, display loader
  if (isLoading) {
    return <Loader />;
  }

  // If event is set, display event infos
  if (event) {
    return (
      <div className="w-full min-h-full flex-grow flex bg-primaryGrey text-primaryText">
        <div className="pt-8 px-8 max-w-7xl w-full justify-center mx-auto ">
          {/* Image */}
          <div className="h-72 md:h-96 rounded-xl relative mb-4">
            <img
              src={event.picture_url}
              alt={event.name}
              className="h-full object-cover rounded-md shadow-2xl w-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="p-2 w-full  text-xl text-center mb-4">
              <p className="text-secondaryPink font-semibold text-3xl">
                {event.name}
              </p>
            </div>

            {/* Side */}
            <div className="flex flex-col md:flex-row-reverse md:justify-between italic">
              <div className="flex flex-wrap md:flex-col md:pl-20 gap-4 justify-center">
                <p>
                  <span className="font-semibold">Date : </span>
                  {displayFullDate(event.date as string)}
                </p>

                <p>
                  <span className="font-semibold">Heure : </span>
                  {formatTime(event.time as string)}
                </p>

                <p>
                  <span className="font-semibold">Lieu : </span>{' '}
                  {event.location}, France
                </p>

                <div className="text-center md:text-left">
                  <p className="mb-1">
                    <span className="font-semibold">
                      Centres d&apos;intérêt
                    </span>{' '}
                    :
                  </p>

                  <div>
                    {event.hobbies.map((hobby) => (
                      <p key={hobby.name}>{hobby.name}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:w-4/5 pb-8">
                <p className="py-6 md:py-0 italic">{event.description}</p>
              </div>
            </div>
          </div>

          {isSubscribed && (
            <p className="text-center text-x0 text-secondaryPink">
              Vous êtes inscrit(e) à cet événement
            </p>
          )}

          {isAuthenticated ? (
            <DefaultBtn
              btnText={buttonText}
              btnEvent={buttonText}
              onClick={() =>
                isSubscribed
                  ? unsubscribeFromEvent(event.id as number)
                  : subscribeToEvent(event.id as number)
              }
            />
          ) : (
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
          <ToastContainer />
        </div>
      </div>
    );
  }
}
