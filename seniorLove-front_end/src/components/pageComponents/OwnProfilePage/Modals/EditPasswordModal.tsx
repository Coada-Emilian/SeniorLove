import ReactModal from 'react-modal';
import { useState } from 'react';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import { IUser } from '../../../../@types/IUser';
import openedEyeIcon from '/icon/eye.svg';
import closedEyeIcon from '/icon/eye-closed.svg';
import newPasswordSchema from '../../../../utils/joiValidateNewPassword';

interface EditPasswordModalProps {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
}

export default function EditPasswordModal({
  isPasswordModalOpen,
  setIsPasswordModalOpen,
  setEditedProfile,
}: EditPasswordModalProps) {
  // State for the old password
  const [oldPassword, setOldPassword] = useState('');
  // State for the new password
  const [newPassword, setNewPassword] = useState('');
  // State for the confirmation of the new password
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for the error message
  const [errorMessage, setErrorMessage] = useState('');
  // State for old password visibility
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  // State for password visibility
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  // State for repeat password visibility
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  // Function to validate the password
  const validatePassword = async () => {
    // Validate the new password via Joi
    const { error } = newPasswordSchema.validate({ password: newPassword });

    // Check if the fields are filled
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Tous les champs doivent être remplis.');
    } else if (error) {
      setErrorMessage(error.details[0].message);
    } else if (newPassword !== confirmPassword) {
      setErrorMessage(
        'Le nouveau mot de passe et la confirmation ne correspondent pas.'
      );
    } else if (newPassword === oldPassword) {
      setErrorMessage(
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
    } else {
      setEditedProfile((prev: Partial<IUser>) => ({
        ...prev,
        old_password: oldPassword,
      }));
      setEditedProfile((prev: Partial<IUser>) => ({
        ...prev,
        new_password: newPassword,
      }));
      setEditedProfile((prev: Partial<IUser>) => ({
        ...prev,
        repeat_new_password: confirmPassword,
      }));
      setIsPasswordModalOpen(false);
    }
  };
  return (
    <ReactModal
      isOpen={isPasswordModalOpen}
      onRequestClose={() => setIsPasswordModalOpen(false)}
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)' /* Customize overlay color */,
        },
      }}
    >
      <h3 className="text-xl font-semibold text-secondaryPink">
        Changer votre mot de passe
      </h3>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="old-password"
            className="font-medium text-primaryText"
          >
            Mot de passe actuel
          </label>
          <div className="flex justify-between border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
            <input
              type={showOldPassword ? 'text' : 'password'}
              name="old-password"
              id="old-password"
              onChange={(e) => {
                setErrorMessage(''), setOldPassword(e.target.value);
              }}
              placeholder="Entrez votre mot de passe actuel"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              <img
                src={showOldPassword ? closedEyeIcon : openedEyeIcon}
                alt={showOldPassword ? 'Hide password' : 'Show password'}
                className="h-6 my-auto px-2 w-auto"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="new-password"
            className="font-medium text-primaryText"
          >
            Nouveau mot de passe
          </label>
          <div className="flex justify-between border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="new-password"
              id="new-password"
              onChange={(e) => {
                setErrorMessage(''), setNewPassword(e.target.value);
              }}
              placeholder="Entrez le nouveau mot de passe"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              <img
                src={showNewPassword ? closedEyeIcon : openedEyeIcon}
                alt={showNewPassword ? 'Hide password' : 'Show password'}
                className="h-6 my-auto px-2 w-auto"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="confirm-password"
            className="font-medium text-primaryText"
          >
            Confirmez le nouveau mot de passe
          </label>
          <div className="flex justify-between border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              name="confirm-password"
              id="confirm-password"
              onChange={(e) => {
                setErrorMessage(''), setConfirmPassword(e.target.value);
              }}
              placeholder="Confirmez le nouveau mot de passe"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword((prev) => !prev)}
            >
              <img
                src={showRepeatPassword ? closedEyeIcon : openedEyeIcon}
                alt={showRepeatPassword ? 'Hide password' : 'Show password'}
                className="h-6 my-auto px-2 w-auto"
              />
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
        </div>
        <DefaultBtn btnText="Valider" onClick={() => validatePassword()} />
      </div>
    </ReactModal>
  );
}
