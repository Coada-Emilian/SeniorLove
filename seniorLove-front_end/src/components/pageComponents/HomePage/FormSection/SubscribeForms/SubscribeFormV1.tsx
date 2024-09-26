import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/img/logo-text-seniorlove.webp';
import { IRegisterForm } from '../../../../../@types/IRegisterForm';
import DefaultBtn from '../../../../standaloneComponents/Button/DefaultBtn';
import computeAge from '../../../../../utils/computeAge';
import formV1Schema from '../../../../../utils/joiValidateFormV1';

interface SubscribeFormV1Props {
  formData: IRegisterForm;
  setIsForm1Validated: React.Dispatch<React.SetStateAction<boolean>>;
  fillFormData: (incomingData: object) => void;
}

export default function SubscribeFormV1({
  formData,
  setIsForm1Validated,
  fillFormData,
}: SubscribeFormV1Props) {
  // States to store the form input values
  const [nameInputValue, setNameInputValue] = useState<string>('');
  const [genderInputValue, setGenderInputValue] = useState<string>('male');
  const [birthDateInputValue, setBirthDateInputValue] = useState<string>('');

  // State to store the error message
  const [validationError, setValidationError] = useState<string | null>(null);

  // Function to handle the name input changes
  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.currentTarget.value);
  };

  // Function to handle the gender input changes
  const handleGenderInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderInputValue(e.currentTarget.value);
  };

  // Function to handle the birth date input changes
  const handleBirthDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthDateInputValue(e.currentTarget.value);
  };

  // Function to validate the first form
  const handleValidateFormV1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the form data
    const rawFormData = Object.fromEntries(new FormData(e.currentTarget));
    const { name, gender, birthDate } = rawFormData;
    // Compute the age via the computeAge function
    const age = computeAge(birthDate as string);

    // Validate the form data
    const { error } = formV1Schema.validate(
      { name, age, gender },
      {
        abortEarly: false,
      }
    );
    // If there is an error, set the error message
    if (error) {
      const newError = error.details[0].message;
      setValidationError(newError);
    } else {
      // If the form is valid, fill the form data and set the form as validated
      const formV1Data = {
        name,
        gender,
        birth_date: rawFormData.birthDate,
      };
      setValidationError(null);
      fillFormData(formV1Data);
      setIsForm1Validated(true);
    }
  };

  // Fill the form with the data from the formData prop
  useEffect(() => {
    if (formData.name && formData.gender && formData.birth_date) {
      setNameInputValue(formData.name);
      setGenderInputValue(formData.gender);
      setBirthDateInputValue(formData.birth_date);
    }
  }, [formData]);

  return (
    <div className="bg-white opacity-90 px-10 pb-10 pt-4 rounded-xl shadow-md my-10 mx-4 md:mx-auto md:my-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={Logo} alt="senior love icon" className="max-w-44 mb-4" />
      </div>

      <form
        className="text-primaryText"
        onSubmit={(e) => handleValidateFormV1(e)}
      >
        <p className="mb-4 text-lg font-semibold text-center uppercase">
          Inscription
        </p>

        <label htmlFor="name" className="flex flex-col mb-4">
          Prénom
          <input
            type="text"
            placeholder="Prénom"
            name="name"
            id="name"
            className="rounded-lg p-2 border border-primaryGrey"
            value={nameInputValue}
            onChange={(e) => handleNameInputChange(e)}
            required
          />
        </label>

        <label htmlFor="gender" className="flex flex-col mb-4">
          Je suis
          <select
            name="gender"
            id="gender"
            className="rounded-lg p-2 border border-primaryGrey"
            value={genderInputValue}
            onChange={(e) => handleGenderInputChange(e)}
            required
          >
            <option value="male">Un homme</option>
            <option value="female">Une femme</option>
            <option value="other">Autre</option>
          </select>
        </label>

        <label htmlFor="birthDate" className="mb-4">
          Date de naissance
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            className="w-full text-center rounded-lg p-2 border border-primaryGrey"
            value={birthDateInputValue}
            onChange={(e) => handleBirthDateInputChange(e)}
            required
          />
        </label>

        {validationError && (
          <div className="text-secondaryPink text-center flex justify-center mt-6">
            <p className="justify-self-center max-w-48">{validationError}</p>
          </div>
        )}

        <div className="flex justify-center mt-6 mb-2">
          <DefaultBtn btnType="submit" btnText="Valider" />
        </div>

        <div className="connexion_paragraph text-primaryText text-center text-base mb-4">
          <p>
            Déjà membre? Connectez-vous{' '}
            <Link to="/login" className="text-secondaryPink">
              ici
            </Link>
            .
          </p>
        </div>

        <div className="step_paragraph text-primaryText text-center text-sm">
          <p>Étape 1/4: Informations personnelles</p>
        </div>
      </form>
    </div>
  );
}
