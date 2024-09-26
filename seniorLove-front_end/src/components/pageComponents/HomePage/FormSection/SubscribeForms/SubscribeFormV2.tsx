import React, { useState } from 'react';

import DefaultBtn from '../../../../standaloneComponents/Button/DefaultBtn';
import { IHobby } from '../../../../../@types/IHobby';
import formV2Schema from '../../../../../utils/joiValidateFormV2';
import Logo from '/img/logo-text-seniorlove.webp';

interface SubscribeFormV2Props {
  hobbies: IHobby[];
  setHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>;
  setIsForm2Validated: React.Dispatch<React.SetStateAction<boolean>>;
  onPreviousClick: () => void;
  fillFormData: (incomingData: object) => void;
}

export default function SubscribeFormV2({
  hobbies,
  setHobbies,
  setIsForm2Validated,

  onPreviousClick,
  fillFormData,
}: SubscribeFormV2Props) {
  // State to store the error message
  const [validationError, setValidationError] = useState<null | string>(null);

  // Function to validate the second form
  const handleValidateFormV2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the hobbies data
    const userHobbies = hobbies
      // Filter the hobbies to get only the checked ones
      .filter((hobby) => hobby.checked)
      // Map the hobbies to get only the ids
      .map((hobby) => hobby.id);

    // Validate the hobbies data
    const { error } = formV2Schema.validate(userHobbies);
    // If there is an error, set the error message
    if (error) {
      const newError = error.details[0].message;
      setValidationError(newError);
    } else {
      // If there is no error, fill the form data and set the form as validated
      setValidationError(null);
      fillFormData({ hobbies: userHobbies });
      setIsForm2Validated(true);
    }
  };

  // Function to handle the hobby check
  const handleHobbyCheck = (id: number) => {
    setHobbies((previousHobbies) =>
      previousHobbies.map((hobby) =>
        hobby.id === id ? { ...hobby, checked: !hobby.checked } : hobby
      )
    );
  };

  return (
    <div className="bg-white opacity-90 p-10 rounded-xl shadow-md max-w-xl my-10 mx-4 md:mx-auto md:my-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={Logo} alt="senior love icon" className="max-w-44 mb-4" />
      </div>

      <form
        className="text-primaryText"
        onSubmit={(e) => handleValidateFormV2(e)}
      >
        <p className="mb-4 text-lg font-semibold leading-6 ">
          Afin de mieux vous connaître, veuillez sélectionner vos centres
          d&apos;intérêt parmi ces options:
        </p>

        <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="flex items-center">
              <input
                id={`hobby-${hobby.id}`}
                type="checkbox"
                checked={hobby.checked}
                onChange={() => handleHobbyCheck(hobby.id)}
                className="h-4 w-4"
              />

              <label
                htmlFor={`hobby-${hobby.id}`}
                className="ml-3 block text-md font-medium "
              >
                {hobby.name}
              </label>
            </div>
          ))}
        </div>

        {validationError && (
          <div className="text-secondaryPink flex justify-center mt-6">
            <p>{validationError}</p>
          </div>
        )}

        <div className="flex justify-center mt-6 mb-2">
          <DefaultBtn btnType="submit" btnText="Valider" />
        </div>

        <div className="step_paragraph flex justify-center">
          <p>Étape 2/4: Centres d&#39;intérêt</p>
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
