import { IContact } from '../../../../@types/IContact';
import EditMessagesForm from './pageComponents/EditMessagesForm';
import ReceivedMessage from './pageComponents/ReceivedMessage';
import SentMessage from './pageComponents/SentMessage';

interface MessagesFieldProps {
  messagesContainerRef: React.RefObject<HTMLDivElement>;
  displayedContact: IContact | undefined;
  badSend: boolean;
  setBadSend: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: (id: number) => void;
  contactId: number;
}

export default function MessagesField({
  messagesContainerRef,
  displayedContact,
  badSend,
  setBadSend,
  sendMessage,
  contactId,
}: MessagesFieldProps) {
  return (
    <div className="bg-white border flex flex-col justify-between w-full h-[calc(100vh-300px)] md:h-[calc(100vh-400px)]">
      <div
        ref={messagesContainerRef}
        className="w-full flex flex-col overflow-y-scroll md:overflow-y-auto"
      >
        {displayedContact?.messages.map((message) => {
          if (displayedContact.id === message.sender_id) {
            return (
              <ReceivedMessage
                key={message.id}
                receivedMessage={message.message_content}
                displayedContactId={displayedContact.id}
                displayedContactPictureUrl={displayedContact.picture_url}
              />
            );
          }

          return (
            <SentMessage
              key={message.id}
              sentMessage={message.message_content}
              ownProfilePictureUrl={message.sender.picture_url}
            />
          );
        })}
      </div>

      <EditMessagesForm
        badSend={badSend}
        setBadSend={setBadSend}
        sendMessage={sendMessage}
        receiverId={contactId}
      />
    </div>
  );
}
