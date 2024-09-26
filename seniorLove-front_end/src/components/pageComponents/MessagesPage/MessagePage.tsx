import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../../../axios';
import ContactsListField from './ContactsListField/ContactsListField';
import { IContact } from '../../../@types/IContact';
import Loader from '../../standaloneComponents/Loader/Loader';
import DefaultBtn from '../../standaloneComponents/Button/DefaultBtn';
import Error500Page from '../../pageComponents/ErrorPages/Error500Page';
import { removeTokenFromLocalStorage } from '../../../localStorage/localStorage';
import MessagesField from './MessagesField/MessagesField';

export default function MessagePage() {
  // State for the contacts array
  const [contactsArray, setContactsArray] = useState<IContact[]>([]);
  // State for the displayed contact
  const [displayedContact, setDisplayedContact] = useState<IContact>();
  // State for the sent message
  const [sentMessage, setSentMessage] = useState({
    sendStatus: false,
    lastReceiverId: displayedContact?.id,
  });
  // State for the display toggle
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(false);
  // State for a bad send
  const [badSend, setBadSend] = useState<boolean>(false);
  // State for loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for the server error
  const [serverError, setServerError] = useState(false);

  // Custom hook for navigation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch the contacts from the server
        const result = await axios.get('/private/contacts');
        // Set the contacts array with the fetched data
        setContactsArray(result.data);
        // Set the displayed contact with the first contact in the array
        if (sentMessage.lastReceiverId) {
          setDisplayedContact(
            contactsArray.find(
              (contact: IContact) => contact.id === sentMessage.lastReceiverId
            )
          );
        } else {
          setDisplayedContact(contactsArray[0]);
        }
      } catch (err) {
        console.error(err);
        if (
          err instanceof AxiosError &&
          (err.response?.data.blocked || err.response?.status === 401)
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
    // Call the fetchMessages function
    fetchMessages();

    // If the window width is greater than 768px, set the toggle display to true
    if (window.innerWidth <= 768) {
      setToggleDisplay(true);
    }
  }, [navigate, sentMessage]);

  // Function to update the displayed contact
  const setNewDisplayedContact = (newContact: IContact) => {
    setDisplayedContact(newContact);
  };

  // Function to send a message
  const sendMessage = (id: number) => {
    // Set the send status to true and the last receiver id to the id of the receiver
    setSentMessage({ sendStatus: !sentMessage.sendStatus, lastReceiverId: id });
  };

  // Function to toggle the message view
  const handleToggleMessageView = () => {
    // Set the toggle display to the opposite of its current value
    setToggleDisplay(false);
  };

  // Get the contact id
  const contactId = Number(displayedContact?.id);

  // Reference for the messages container
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [displayedContact]);

  // If the server error is true, return the Error500Page component
  if (serverError) {
    return <Error500Page />;
  }

  // If the page is loading, return the Loader component
  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col w-full items-center justify-center bg-backgroundPink pb-8 flex-1">
      <div className="w-full lg:w-5/6 xl:w-4/6 px-3">
        {!toggleDisplay && (
          <DefaultBtn
            btnText="Revenir aux contacts"
            btnMessageMobile
            onClick={() => setToggleDisplay(true)}
          />
        )}

        {contactsArray.length === 0 ? (
          <p className="text-center font-semibold pt-6">
            Vous n&apos;avez pas de messages !
          </p>
        ) : (
          <div className="md:flex mt-6 md:w-full">
            <div
              className={`overflow-y-scroll md:overflow-y-auto p-4 bg-white border flex-col ${toggleDisplay ? 'flex' : 'hidden md:flex'} gap-y-2 items-center md:w-3/5 h-[calc(100vh-300px)] md:h-[calc(100vh-400px)]`}
            >
              <ContactsListField
                contactsArray={contactsArray}
                setNewDisplayedContact={setNewDisplayedContact}
                setBadSend={setBadSend}
                handleToggleMessageView={handleToggleMessageView}
              />
            </div>
            <div
              className={`${toggleDisplay ? 'hidden md:block' : ''} w-full `}
            >
              <MessagesField
                messagesContainerRef={messagesContainerRef}
                displayedContact={displayedContact}
                badSend={badSend}
                setBadSend={setBadSend}
                sendMessage={sendMessage}
                contactId={contactId}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
