import { useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../../../axios';
import DefaultBtn from '../../../../standaloneComponents/Button/DefaultBtn';
import Error500Page from '../../../ErrorPages/Error500Page';

interface EditMessage {
  setBadSend: React.Dispatch<React.SetStateAction<boolean>>;
  badSend: boolean;
  sendMessage: (id: number) => void;
  receiverId: number;
}

export default function EditMessagesForm({
  sendMessage,
  receiverId,
  badSend,
  setBadSend,
}: EditMessage) {
  // State for the message
  const [message, setMessage] = useState('');
  // State for the server error
  const [serverError, setServerError] = useState(false);

  // Function to submit the message
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the form data
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // Check if message is not empty before sending to API
    if (formData.sentMessage.toString().length === 0) {
      return;
    }
    try {
      // Send the message to the server
      await axios.post('/private/messages', {
        message_content: formData.sentMessage,
        receiver_id: receiverId,
      });
      // Send the message to the parent component
      sendMessage(receiverId);
      setMessage('');
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response?.status === 403) {
        setBadSend(true);
        setMessage('');
      } else {
        setServerError(true);
      }
    }
  };

  // If there is a server error, display the 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  return (
    <form
      action="POST"
      className="bg-transparent shadow-message"
      id="formMessage"
      onSubmit={(e) => submitMessage(e)}
    >
      {badSend && (
        <p className="text-red-500 text-xs text-center">
          Ce contact n&apos;est plus disponible pour recevoir des messages.
        </p>
      )}

      <input
        type="text"
        name="sentMessage"
        placeholder="Envoyez un message..."
        className="border-y shadow-inner w-full h-15 px-2"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <DefaultBtn btnType="submit" btnText="Envoyer" />
    </form>
  );
}
