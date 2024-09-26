import ReactModal from 'react-modal';
import { useState } from 'react';
import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface EditDescriptionProps {
  user: IUser;
  isDescriptionModalOpen: boolean;
  newDescription: string;
  setIsDescriptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditDescriptionModal({
  user,
  isDescriptionModalOpen,
  newDescription,
  setEditedProfile,
  setIsDescriptionModalOpen,
  setNewDescription,
}: EditDescriptionProps) {
  // State for the pending new description
  const [pendingDescription, setPendingDescription] = useState(newDescription);

  // Function to set the pending description
  const validateDescription = async () => {
    setEditedProfile((prev: Partial<IUser>) => ({
      ...prev,
      description: pendingDescription,
    }));
    setIsDescriptionModalOpen(false);
    setNewDescription(pendingDescription);
  };

  return (
    <ReactModal
      isOpen={isDescriptionModalOpen}
      onRequestClose={() => setIsDescriptionModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <h3 className="text-xl font-semibold text-secondaryPink mb-4">
        Modifiez votre description
      </h3>

      <div className="flex flex-col gap-3">
        <textarea
          name="new-description"
          id="new-description"
          onChange={(e) => setPendingDescription(e.target.value)}
          rows={10}
          placeholder={user.description}
          value={pendingDescription}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
        />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <DefaultBtn btnText="Valider" onClick={validateDescription} />
      </div>
    </ReactModal>
  );
}
