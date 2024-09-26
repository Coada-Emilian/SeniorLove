import { useEffect, useState } from 'react';
import ConversationPreview from './pageComponents/ConversationPreview';
import { IContact } from '../../../../@types/IContact';

interface ContactsListFieldProps {
  contactsArray: IContact[];
  setNewDisplayedContact: (newContact: IContact) => void;
  setBadSend: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleMessageView: () => void;
}

export default function ContactsListField({
  contactsArray,
  setNewDisplayedContact,
  setBadSend,
  handleToggleMessageView,
}: ContactsListFieldProps) {
  // State for the selected contact
  const [isContactIndexSelected, setIsContactIndexSelected] = useState<
    boolean[]
  >([]);

  // Function to handle the selected contact
  function handleSelectedContactIndex(index: number) {
    const newSelectedContact = new Array(isContactIndexSelected.length).fill(
      false
    );
    newSelectedContact[index] = true;
    setIsContactIndexSelected(newSelectedContact);
  }

  useEffect(() => {
    // Function to set the contact index
    const setContactIndex = () => {
      setIsContactIndexSelected([...Array(contactsArray.length).fill(false)]);
      const newDefaultList = [...isContactIndexSelected];
      newDefaultList[0] = true;
      setIsContactIndexSelected(newDefaultList);
      handleSelectedContactIndex(0);
    };
    setContactIndex();
  }, [contactsArray]);

  return (
    <>
      <p className="italic text-secondaryPink">Messages</p>
      {contactsArray.map((contact, i) => {
        return (
          <ConversationPreview
            key={contact.id}
            contact={contact}
            setBadSend={setBadSend}
            setNewDisplayedContact={setNewDisplayedContact}
            onSelect={() => handleSelectedContactIndex(i)}
            isSelected={isContactIndexSelected[i]}
            handleToggleMessageView={handleToggleMessageView}
          />
        );
      })}
    </>
  );
}
