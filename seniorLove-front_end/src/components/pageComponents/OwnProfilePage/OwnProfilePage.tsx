import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../axios';
import { ToastContainer, toast } from 'react-toastify';
import { IUser } from '../../../@types/IUser';
import { IHobby } from '../../../@types/IHobby';
import {
  removeTokenFromLocalStorage,
  updateDataInLocalStorage,
} from '../../../localStorage/localStorage';
import Loader from '../../standaloneComponents/Loader/Loader';
import DefaultBtn from '../../standaloneComponents/Button/DefaultBtn';
import Error500Page from '../ErrorPages/Error500Page';
import EditImageModal from './Modals/EditImageModal';
import EditHobbyModal from './Modals/EditHobbyModal';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';
import EditNameModal from './Modals/EditNameModal';
import EditDescriptionModal from './Modals/EditDescriptionModal';
import EditMailModal from './Modals/EditMailModal';
import EditPasswordModal from './Modals/EditPasswordModal';
import UserPhotoSection from './PageComponents/UserPhotoSection';
import NameAgeMobileSection from './PageComponents/NameAgeMobileSection';
import EditButtonMobileSection from './PageComponents/EditButtonMobileSection';
import HobbiesSection from './PageComponents/HobbiesSection';
import NameAgeDesktopSection from './PageComponents/NameAgeDesktopSection';
import DescriptionSection from './PageComponents/DescriptionSection';
import EditEmailPasswordSection from './PageComponents/EditEmailPasswordSection';
import EventsSection from './PageComponents/EventsSection';
import EditButtonDesktopSection from './PageComponents/EditButtonDesktopSection';

interface OwnProfilePageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function OwnProfilePage({
  setIsAuthenticated,
}: OwnProfilePageProps) {
  // Get the connected user ID from the URL
  const { myId } = useParams<{ myId: string }>();

  // Hook to navigate between pages
  const navigate = useNavigate();

  // State for the connected user
  const [me, setMe] = useState<IUser | null>(null);
  // State for the loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // State for photo loading
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
  // State for the server error
  const [serverError, setServerError] = useState(false);
  // State for the image modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  // State for the hobby modal
  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  // State for the name modal
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  // State for the Description modal
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  // State for the email modal
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  // State for the password modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // State for the confirm delete modal
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState<boolean>(false);
  // State for the new name
  const [newName, setNewName] = useState('');
  // State for the new Description
  const [newDescription, setNewDescription] = useState('');
  // State for the modified photo URL
  const [modifiedPhotoUrl, setModifiedPhotoUrl] = useState<string | null>(null);
  // State for the edited profile
  const [editedProfile, setEditedProfile] = useState<Partial<IUser>>({});
  // State for the preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // State for the update function
  const [updateFunction, setUpdateFunction] = useState<() => void>(
    () => () => {}
  );
  // State for the new hobbies
  const [newHobbies, setNewHobbies] = useState<IHobby[]>([]);
  // State for the added hobbies
  const [addedHobbies, setAddedHobbies] = useState<number[]>([]);

  // Confirmation toasts
  const editNotify = () =>
    toast.success('Votre profil a été mis à jour avec succès.', {
      autoClose: 3000,
    });
  const cancelEditNotify = () =>
    toast.error('Vous avez annulé la modification de votre profil.', {
      autoClose: 3000,
    });

  // Fetch the connected user and set the state
  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const response = await axios.get(`/private/users/me`);
        setMe(response.data);
        setEditedProfile(response.data);
        setNewName(me?.name || '');
        setNewDescription(me?.description || '');
      } catch (e) {
        console.error(e);
        if (
          e instanceof AxiosError &&
          (e.response?.data.blocked || e.response?.status === 401)
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
    fetchConnectedUser();
  }, [myId, navigate, me?.name, me?.description]);

  // Set the added hobbies in the state
  useEffect(() => {
    if (me) {
      setAddedHobbies(me.hobbies.map((hobby) => hobby.id));
    }
  }, [me]);

  // Function to delete the connected user account
  const deleteAccount = async () => {
    try {
      await axios.delete(`/private/users/me/delete`);
      setIsAuthenticated(false);
      removeTokenFromLocalStorage();
      navigate('/');
    } catch (e) {
      console.error(e);
      setServerError(true);
    }
  };

  // Function to handle the delete click
  const handleDeleteClick = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  // Function to handle the confirm delete behavior
  const handleConfirmDelete = () => {
    // Confirmation de la suppression
    deleteAccount();
  };

  // Function to handle the cancel delete behavior
  const handleCancelDelete = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  // Function to handle the submit of the form
  const handleSubmit = async () => {
    try {
      // Call the update function if it exists
      if (updateFunction) {
        updateFunction();
      }
      // Prepare the data to send to the backend
      const dataToSend = {
        name: editedProfile.name,
        description: editedProfile.description,
        gender: editedProfile.gender,
        email: editedProfile.email,
        old_password: editedProfile.old_password,
        new_password: editedProfile.new_password,
        repeat_new_password: editedProfile.repeat_new_password,
        hobbies: editedProfile.hobbies,
      };

      // Send the data to the backend
      const response = await axios.patch(`/private/users/me`, dataToSend);

      // If the response is successful (status code 200-299), notify the user
      if (response.status >= 200 && response.status < 300) {
        editNotify();
      }
      // Update the state with the new data
      setMe(response.data);
      // Update the local storage with the new data
      updateDataInLocalStorage('', response.data.name);
      // Reset the state
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      setServerError(true);
    }
  };

  // Function to handle the edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
      setEditedProfile(me || {});
    }
  };

  // Function to handle the cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateFunction(() => () => {});
    // Reset the state to the original values
    if (me) {
      setModifiedPhotoUrl(me.picture_url);
      setNewHobbies([]);
      setEditedProfile(me);
    }
    // Notify the user
    cancelEditNotify();
  };

  // If the loading is true, display the loading spinner
  if (isLoading) {
    return (
      <section className=" justify-center md:items-center flex md:px-16 md:h-screen">
        <Loader />
      </section>
    );
  }

  // If the server error is true, display the 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  // If the connected user is not found, display the 500 error page
  if (!me) {
    return <Error500Page />;
  }

  return (
    <div className="w-full min-h-full flex-grow flex flex-col items-center justify-between bg-primaryGrey">
      <div className="flex flex-col pt-8 px-8 max-w-7xl w-full gap-10 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-1/3">
          <UserPhotoSection
            me={me}
            isEditing={isEditing}
            setIsImageModalOpen={setIsImageModalOpen}
            isPhotoLoading={isPhotoLoading}
            modifiedPhotoUrl={modifiedPhotoUrl}
          />

          <div className="font-semibold flex flex-col text-center justify-between md:hidden">
            <NameAgeMobileSection
              me={me}
              isEditing={isEditing}
              setIsNameModalOpen={setIsNameModalOpen}
              newName={newName}
            />

            <EditButtonMobileSection
              isEditing={isEditing}
              handleEditToggle={handleEditToggle}
              handleCancelEdit={handleCancelEdit}
            />
          </div>

          <HobbiesSection
            isEditing={isEditing}
            me={me}
            setIsHobbyModalOpen={setIsHobbyModalOpen}
            newHobbies={newHobbies}
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-3 md:gap-6">
          <div className="hidden font-semibold md:flex text-center justify-between">
            <NameAgeDesktopSection
              me={me}
              isEditing={isEditing}
              setIsNameModalOpen={setIsNameModalOpen}
              newName={newName}
            />

            <EditButtonDesktopSection
              isEditing={isEditing}
              handleEditToggle={handleEditToggle}
              handleCancelEdit={handleCancelEdit}
            />
          </div>

          <DescriptionSection
            isEditing={isEditing}
            me={me}
            newDescription={newDescription}
            setIsDescriptionModalOpen={setIsDescriptionModalOpen}
          />

          {isEditing && (
            <EditEmailPasswordSection
              setIsEmailModalOpen={setIsEmailModalOpen}
              setIsPasswordModalOpen={setIsPasswordModalOpen}
            />
          )}

          <EventsSection me={me} />
        </div>
      </div>

      <div className="pb-8 pt-32 md:pt-16">
        <DefaultBtn
          btnText="Supprimer mon compte"
          btnPage="profile"
          btnDelete
          onClick={handleDeleteClick}
        />
      </div>

      {isEmailModalOpen && (
        <EditMailModal
          isEmailModalOpen={isEmailModalOpen}
          setIsEmailModalOpen={setIsEmailModalOpen}
          user={me}
          setEditedProfile={setEditedProfile}
        />
      )}

      {isPasswordModalOpen && (
        <EditPasswordModal
          isPasswordModalOpen={isPasswordModalOpen}
          setIsPasswordModalOpen={setIsPasswordModalOpen}
          setEditedProfile={setEditedProfile}
        />
      )}

      {isImageModalOpen && (
        <EditImageModal
          isImageModalOpen={isImageModalOpen}
          setIsImageModalOpen={setIsImageModalOpen}
          setEditedProfile={setEditedProfile}
          setModifiedPhotoUrl={setModifiedPhotoUrl}
          setIsPhotoLoading={setIsPhotoLoading}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          setUpdateFunction={setUpdateFunction}
          user={me}
        />
      )}

      {isNameModalOpen && (
        <EditNameModal
          isNameModalOpen={isNameModalOpen}
          setIsNameModalOpen={setIsNameModalOpen}
          user={me}
          setEditedProfile={setEditedProfile}
          newName={newName}
          setNewName={setNewName}
        />
      )}

      {isDescriptionModalOpen && (
        <EditDescriptionModal
          isDescriptionModalOpen={isDescriptionModalOpen}
          setIsDescriptionModalOpen={setIsDescriptionModalOpen}
          user={me}
          setEditedProfile={setEditedProfile}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
        />
      )}

      {isHobbyModalOpen && (
        <EditHobbyModal
          isHobbyModalOpen={isHobbyModalOpen}
          setIsHobbyModalOpen={setIsHobbyModalOpen}
          setEditedProfile={setEditedProfile}
          setNewHobbies={setNewHobbies}
          addedHobbies={addedHobbies}
          setAddedHobbies={setAddedHobbies}
        />
      )}

      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
          setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}

      {serverError && (
        <p className="text-red-600 mt-4">
          Une erreur est survenue lors de la suppression du compte.
        </p>
      )}
      <ToastContainer />
    </div>
  );
}
