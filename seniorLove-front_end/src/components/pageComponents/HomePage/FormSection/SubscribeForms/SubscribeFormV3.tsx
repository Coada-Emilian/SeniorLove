import { useState, useEffect } from 'react';
import DefaultBtn from '../../../../standaloneComponents/Button/DefaultBtn';
import { IRegisterForm } from '../../../../../@types/IRegisterForm';
import formV3Schema from '../../../../../utils/joiValidateFormV3';
import Logo from '/img/logo-text-seniorlove.webp';
import uploadIcon from '/icon/upload.svg';

interface SubscribeFormV3Props {
  formData: IRegisterForm;
  fillFormData: (incomingData: object) => void;
  setIsForm3Validated: React.Dispatch<React.SetStateAction<boolean>>;
  onPreviousClick: () => void;
}

export default function SubscribeFormV3({
  formData,
  setIsForm3Validated,
  fillFormData,
  onPreviousClick,
}: SubscribeFormV3Props) {
  // State to store the selected picture file
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  // State to store the description input value
  const [descriptionInputValue, setDescriptionInputValue] =
    useState<string>('');
  // State to store the error message
  const [validationError, setValidationError] = useState<string | null>(null);
  // State to store the image preview
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  // Function to handle the description input change
  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionInputValue(e.currentTarget.value);
  };

  // Function to validate the third form
  const handleValidateFormV3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data
    const { error } = formV3Schema.validate(
      {
        descriptionInputValue,
        pictureFile,
      },
      { abortEarly: false }
    );
    // If there is an error, set the error message
    if (error) {
      setValidationError(error.details[0].message);
      return;
    } else {
      try {
        // Create a new FormData instance
        const formData = new FormData();
        // Append the form data to the FormData instance
        if (pictureFile) {
          formData.append('picture', pictureFile); // File upload
        }
        formData.append('description', descriptionInputValue);
        // Update form info with picture and description
        fillFormData({
          picture: pictureFile,
          description: descriptionInputValue,
        });
        setValidationError(null);
        setIsForm3Validated(true);
      } catch (err) {
        setValidationError(
          'Une erreur est survenue lors de la soumission du formulaire.'
        );
      }
    }
  };
  // Set the picture and description input values if they are already in the form data
  useEffect(() => {
    if (formData.picture && formData.description) {
      setPictureFile(formData.picture);
      setDescriptionInputValue(formData.description);
    }
  }, [formData]);

  // Event handler for image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    const file = e.target.files ? e.target.files[0] : null;
    // Check if a file is selected
    if (file) {
      // Create a new FileReader instance
      const reader = new FileReader();
      // Set the image preview when the file is read
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // Clear preview if no file is selected
      setImagePreview(null);
    }
    // Set the selected file in state
    if (e.target.files && e.target.files[0]) {
      setPictureFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white opacity-90 px-10 pb-10 pt-4 rounded-xl shadow-md my-10 mx-4 md:mx-auto md:my-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={Logo} alt="senior love icon" className="max-w-44 mb-4" />
      </div>

      <form
        className="text-primaryText"
        encType="multipart/form-data"
        onSubmit={(e) => handleValidateFormV3(e)}
      >
        <p className="mb-4 text-lg font-semibold text-center">
          Commencez à compléter votre profil.
        </p>

        <label
          htmlFor="file"
          className="flex items-center px-8 py-1 md:py-3 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-100 cursor-pointer"
        >
          <img
            className="h-6 w-auto"
            src={uploadIcon}
            alt="Uploader une photo"
          />

          <div className="space-y-2">
            <h4 className="text-sm md:text-base font-semibold text-gray-700 text-center">
              Uploader une photo
            </h4>
          </div>

          <input
            type="file"
            id="file"
            name="file"
            accept="png, jpg, webp, jpeg"
            hidden
            onChange={(e) => handleImageChange(e)}
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview as string}
            alt="Apercu de l'image"
            className="max-w-36 max-h-36 my-2 mx-auto rounded-lg shadow-lg"
          />
        )}

        <div className="mb-2 mt-4">
          <label htmlFor="description" className="block font-medium leading-6 ">
            Présentez-vous en quelques lignes
          </label>
        </div>

        <div className="mt-2">
          <div className="flex bg-white rounded-md shadow-sm border">
            <textarea
              name="description"
              id="description"
              cols={60}
              rows={7}
              maxLength={1000}
              placeholder="Écrivez votre description ici"
              className="block w-full border-0 bg-transparent py-1.5 p-2  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              value={descriptionInputValue}
              onChange={handleDescriptionInputChange}
              required
            />
          </div>
        </div>

        {validationError && (
          <div className="text-secondaryPink text-center flex justify-center mt-6">
            <p className="justify-self-center max-w-48">{validationError}</p>
          </div>
        )}

        <div className="flex justify-center mt-6 mb-2">
          <DefaultBtn btnType="submit" btnText="Valider" />
        </div>

        <div className="step_paragraph text-primaryText text-center text-sm">
          <p>Étape 3/4: Photo de profil et description</p>
        </div>

        <div className="flex justify-center text-secondaryPink mt-1">
          <button type="button" onClick={onPreviousClick}>
            Revenir à l&#39;étape précédente
          </button>
        </div>
      </form>
    </div>
  );
}
