import { IContact } from '../../../../../@types/IContact';

interface ConversationPreviewProps {
  setNewDisplayedContact: (newContact: IContact) => void;
  contact: IContact;
  setBadSend: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: () => void;
  isSelected: boolean;
  handleToggleMessageView: () => void;
}

export default function ConversationPreview({
  contact,
  setNewDisplayedContact,
  setBadSend,
  onSelect,
  isSelected,
  handleToggleMessageView,
}: ConversationPreviewProps) {
  // Get the last message from the contact
  const lastMessage = contact.messages[contact.messages.length - 1];
  // Get the message from the last message
  const { message_content }: { message_content: string } = lastMessage;

  return (
    <button
      type="button"
      className={`p-2 hover:shadow-around max-md:shadow-md ${isSelected ? 'md:shadow-around' : ''} w-full`}
      onClick={() => {
        setNewDisplayedContact(contact);
        setBadSend(false);
        onSelect();
        if (window.innerWidth <= 768) {
          handleToggleMessageView();
        }
      }}
    >
      <div className="flex justify-start">
        <img
          src={contact.picture_url}
          alt={contact.name}
          className="aspect-square rounded-full size-20 object-cover shadow-lg"
        />

        <div>
          <h2 className="mb-1.5 text-sm p-2 text-left font-medium text-secondaryPink">
            {contact.name}
          </h2>

          <p className="p-2 font-semibold text-xs text-primaryText block">
            {`${message_content.substring(0, 50)}...`}
          </p>
        </div>
      </div>
    </button>
  );
}
