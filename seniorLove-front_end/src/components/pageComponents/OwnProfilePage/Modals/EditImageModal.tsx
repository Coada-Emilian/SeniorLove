/* eslint-disable jsx-a11y/label-has-associated-control */
import ReactModal from 'react-modal';
import { useState } from 'react';
import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import { updateDataInLocalStorage } from '../../../../localStorage/localStorage';
import axios from '../../../../axios';

interface EditImageModalProps {
  isImageModalOpen: boolean;
  user: IUser;
  previewUrl: string | null;
  setIsImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  setModifiedPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsPhotoLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdateFunction: React.Dispatch<React.SetStateAction<() => void>>;
}

export default function EditImageModal({
  isImageModalOpen,
  previewUrl,
  user,
  setIsImageModalOpen,
  setEditedProfile,
  setModifiedPhotoUrl,
  setIsPhotoLoading,
  setPreviewUrl,
  setUpdateFunction,
}: EditImageModalProps) {
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to store the error message
  const [error, setError] = useState<string | null>(null);

  // Function to handle the file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    const file = e.target.files ? e.target.files[0] : null;
    // Set the selected file in state
    if (file) {
      setSelectedFile(file);
    }

    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    // Read the file as a data URL
    if (file) {
      reader.readAsDataURL(file as Blob);
    }
  };

  // Function to handle the image upload
  const handleImageUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
      const formData = new FormData();
      formData.append('new-image', selectedFile);
      setIsPhotoLoading(true);
      setError(null);

      // Send the request to the server
      const response = await axios.post(
        `/private/users/${user.id}/uploadPhoto`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle the response
      const result = response.data;
      if (response.status === 200) {
        setEditedProfile((prev) => ({
          ...prev,
          picture_url: result.pictureUrl,
        }));
        setEditedProfile((prev) => ({ ...prev, picture_id: result.pictureId }));
        updateDataInLocalStorage(result.pictureUrl, '');
        setIsImageModalOpen(false);
      } else {
        setError(result.error || 'Image upload failed');
      }
    } catch (err) {
      setError('Error uploading image');
      console.error('Error uploading image:', error);
    } finally {
      setIsPhotoLoading(false);
    }
  };

  // Function to validate the image
  const validateImage = () => {
    setModifiedPhotoUrl(previewUrl);
    setPreviewUrl(null);
    setUpdateFunction(() => handleImageUpload);
    setIsImageModalOpen(false);
  };

  return (
    <ReactModal
      isOpen={isImageModalOpen}
      onRequestClose={() => setIsImageModalOpen(false)}
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
      <h3 className="text-xl text-center font-semibold text-secondaryPink">
        Modifiez votre image
      </h3>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <img
              src={user.picture_url}
              alt={user.name}
              className="w-1/2 object-cover rounded-2xl shadow-2xl border "
            />

            <p className="mt-2 text-gray-600">Ancienne image</p>
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="doc"
              className="flex items-center px-8 py-1 md:py-3 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-100 cursor-pointer"
            >
              <img
                className="h-6 w-auto"
                src="/icon/upload.svg"
                alt="Télécharger"
              />

              <div className="space-y-2">
                <h4 className="text-sm md:text-base font-semibold text-gray-700 text-center">
                  Uploader une nouvelle image
                </h4>
              </div>

              <input
                type="file"
                id="doc"
                name="doc"
                accept="png, jpg, webp, jpeg"
                hidden
                onChange={handleFileChange}
              />
            </label>

            {previewUrl && (
              <>
                <p className="mt-6 text-gray-600 mb-2">Nouvelle image</p>

                <img
                  src={previewUrl}
                  alt={user.name}
                  className="w-1/2 object-cover rounded-2xl shadow-2xl border "
                />
              </>
            )}
          </div>
        </div>

        <div className="flex">
          <DefaultBtn
            btnText="Valider"
            btnModalPicture
            onClick={() => validateImage()}
          />
        </div>
      </div>
    </ReactModal>
  );
}
