import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../axios';
import { IUser } from '../../../@types/IUser';
import Loader from '../../standaloneComponents/Loader/Loader';
import Error500Page from '../ErrorPages/Error500Page';

import { removeTokenFromLocalStorage } from '../../../localStorage/localStorage';
import DetailsMobileSection from './PageComponents/DetailsMobileSection';
import HobbiesSection from './PageComponents/HobbiesSection';
import DetailsDesktopSection from './PageComponents/DetailsDesktopSection';
import DescriptionSection from './PageComponents/DescriptionSection';
import EventsSection from './PageComponents/EventsSection';

export default function ForeignProfilePage() {
  // Get the user ID from the URL
  const { userId } = useParams<{ userId: string }>();

  // State for the user profile
  const [user, setUser] = useState<IUser | null>(null);
  // State for the loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for the error handling
  const [isError, setIsError] = useState<number | null>(null);
  // State for the message sending
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  // State for the error message
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  // State for the message field
  const [messageField, setMessageField] = useState<string>('');
  // State for the message field in mobile view
  const [messageFieldMobile, setMessageFieldMobile] = useState<string>('');

  // Hook to navigate between pages
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the user profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/private/users/${userId}`);
        setUser(response.data);
      } catch (e) {
        if (
          e instanceof AxiosError &&
          (e.response?.data.blocked || e.response?.status === 401)
        ) {
          removeTokenFromLocalStorage();
          navigate('/loggedOut');
        } else if (e instanceof AxiosError && e.response?.status === 404) {
          console.error(e);
          setIsError(404);
        } else {
          setIsError(500);
          console.log(e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate, userId]);

  // Function to send a message
  const sendMessage = async () => {
    // Create an empty message variable
    let message_content = '';
    // Check if the text field is not empty
    if (messageField.trim().length > 0) {
      message_content = messageField.trim();
    } else if (messageFieldMobile.trim().length > 0) {
      message_content = messageFieldMobile;
    } else {
      return;
    }
    // Send the message to the API
    try {
      await axios.post(`/private/messages`, {
        message_content,
        receiver_id: userId,
      });
      setIsMessageSent(false);
      navigate('/messages');
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError && e.response?.status === 403) {
        setErrorMessage(true);
      } else {
        setIsError(500);
      }
    }
  };

  // Function to handle the message toggle
  const handleMessageToggle = () => {
    if (isMessageSent) {
      sendMessage();
    } else {
      setIsMessageSent(true);
    }
  };

  // Error handling
  if (isError === 500) {
    return <Error500Page />;
  } else if (isError === 404) {
    return <Navigate to="*" />;
  }

  // Loading spinner
  if (isLoading) {
    return (
      <section className=" justify-center md:items-center flex md:px-16 md:h-screen">
        <Loader />
      </section>
    );
  }

  // If the user is not found in the database return a 404 page
  if (!user) {
    return <Navigate to="*" />;
  }

  return (
    <div className="w-full min-h-full flex-grow flex flex-col items-center justify-between bg-primaryGrey">
      <div className="flex flex-col pt-8 px-8 max-w-7xl w-full gap-10 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-1/3">
          <img
            src={user.picture_url}
            alt={user.name}
            className="max-w-64 md:max-w-full rounded-3xl shadow-2xl"
          />

          <DetailsMobileSection
            user={user}
            handleMessageToggle={handleMessageToggle}
            isMessageSent={isMessageSent}
            errorMessage={errorMessage}
            messageFieldMobile={messageFieldMobile}
            setMessageFieldMobile={setMessageFieldMobile}
          />

          <HobbiesSection user={user} />
        </div>

        <div className="md:w-2/3 flex flex-col gap-3 md:gap-6">
          <DetailsDesktopSection
            user={user}
            handleMessageToggle={handleMessageToggle}
            isMessageSent={isMessageSent}
            errorMessage={errorMessage}
            messageField={messageField}
            setMessageField={setMessageField}
          />

          <DescriptionSection user={user} />

          <EventsSection user={user} />
        </div>
      </div>
    </div>
  );
}
