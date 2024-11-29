import ReactModal from 'react-modal';
import { useState } from 'react';
import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import { error } from 'console';

interface EditMailModalProps {
  isEmailModalOpen: boolean;
  user: IUser;
  setIsEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
}

export default function EditMailModal({
  isEmailModalOpen,
  user,
  setIsEmailModalOpen,
  setEditedProfile,
}: EditMailModalProps) {
  // State for the new email
  const [newEmail, setNewEmail] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate the new email
  const validateEmail = async () => {
    if (!newEmail) {
      setErrorMessage('Veuillez entrer une adresse e-mail.');
    } else if (newEmail === user.email) {
      setErrorMessage('La nouvelle adresse e-mail doit être différente.');
    } else if (!newEmail.includes('@')) {
      setErrorMessage('Veuillez entrer une adresse e-mail valide.');
    } else {
      setEditedProfile((prev) => ({ ...prev, email: newEmail }));
      setIsEmailModalOpen(false);
    }
  };

  return (
    <ReactModal
      isOpen={isEmailModalOpen}
      onRequestClose={() => setIsEmailModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6pxrgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <h3 className="text-xl font-semibold text-secondaryPink">
        Modifiez votre adresse e-mail
      </h3>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="old-email" className="font-medium text-primaryText">
            Ancienne adresse e-mail
          </label>

          <p className="text-primaryText">{user.email}</p>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="new-email" className="font-medium text-primaryText">
            Nouvelle adresse e-mail
          </label>

          <input
            type="email"
            name="new-email"
            id="new-email"
            onChange={(e) => {
              setErrorMessage(''), setNewEmail(e.target.value);
            }}
            placeholder="Veuillez entrer votre nouvelle adresse e-mail"
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600"
          />
        </div>
        {errorMessage && (
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        )}
        <DefaultBtn btnText="Valider" onClick={() => validateEmail()} />
      </div>
    </ReactModal>
  );
}
