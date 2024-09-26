import { useState } from 'react';
import DefaultBtn from '../../../../standaloneComponents/Button/DefaultBtn';
import formV4Schema from '../../../../../utils/joiValidateFormV4';
import openedEyeIcon from '/icon/eye.svg';
import closedEyeIcon from '/icon/eye-closed.svg';
import Logo from '/img/logo-text-seniorlove.webp';

interface SubscribeFormV4Props {
  onPreviousClick: () => void;
  fillFormData: (incomingData: object) => void;
  setIsForm4Validated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGlobalFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubscribeFormV4({
  onPreviousClick,
  fillFormData,
  setIsForm4Validated,
  setIsGlobalFormSubmitted,
}: SubscribeFormV4Props) {
  // State to store the error message
  const [validationError, setValidationError] = useState<null | string>(null);
  // State for password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // State for repeat password visibility
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  // Function to validate the fourth form
  const handleValidateFormV4 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the form data
    const rawFormData = Object.fromEntries(new FormData(e.currentTarget));
    // Destructure the form data
    const { email, password, repeatPassword } = rawFormData;
    // Validate the form data
    const { error } = formV4Schema.validate(rawFormData);
    // If there is an error, set the error message
    if (error) {
      setValidationError(error.details[0].message);
    } else {
      // If the form is valid, fill the form data and set the form as validated
      const formV3Infos = {
        email,
        password,
        repeat_password: repeatPassword,
      };
      fillFormData(formV3Infos);
      setIsForm4Validated(true);
      setIsGlobalFormSubmitted(true);
    }
  };

  return (
    <div className="bg-white opacity-90 p-10 rounded-xl shadow-md max-w-xl my-10 mx-4 md:mx-auto md:my-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={Logo} alt="senior love icon" className="max-w-44 mb-4" />
      </div>

      <form
        className="text-primaryText"
        onSubmit={(e) => handleValidateFormV4(e)}
      >
        <p className="text-lg text-center font-semibold leading-6 text-primaryText mb-4">
          Il ne vous reste plus qu&apos;une étape pour finaliser votre
          inscription !
        </p>

        <label
          htmlFor="email"
          className="block text-lg font-medium leading-6 text-primaryText"
        >
          Adresse e-mail
        </label>

        <div className="flex bg-white rounded-md shadow-sm border mb-4 mt-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="exemple@domaine.com"
            className="block w-full border-0 bg-transparent py-1.5 p-2 text-primaryText placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <label
          htmlFor="password"
          className="flex text-lg font-medium leading-6 text-primaryText"
        >
          Mot de passe{' '}
          <p
            className="text-sm text-center ml-4"
            title="12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre
                & 1 caractère spécial"
          >
            <img
              src="/icon/question-circle.svg"
              alt="aide"
              className="w-6 cursor-help"
            />
            <span className="sr-only">
              12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1
              caractère spécial
            </span>
          </p>
        </label>

        <div className="flex bg-white rounded-md shadow-sm border mb-4 mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Votre mot de passe"
            className="block w-full border-0 bg-transparent py-1.5 p-2 text-primaryText placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? closedEyeIcon : openedEyeIcon}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className="h-6 my-auto px-2 w-auto"
            />
          </button>
        </div>

        <label
          htmlFor="email"
          className="block text-lg font-medium leading-6 text-primaryText"
        >
          Confirmer mot de passe
        </label>

        <div className="flex bg-white rounded-md shadow-sm border mb-4 mt-2">
          <input
            id="repeatPassword"
            name="repeatPassword"
            type={showRepeatPassword ? 'text' : 'password'}
            placeholder="Confirmer votre mot de passe"
            className="block w-full border-0 bg-transparent py-1.5 p-2 text-primaryText placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            required
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

        {validationError && (
          <div className="text-secondaryPink text-center flex justify-center mt-6">
            <p>{validationError}</p>
          </div>
        )}

        <div className="flex justify-center mt-6 mb-2">
          <DefaultBtn btnType="submit" btnText="Valider" />
        </div>

        <div className="step_paragraph text-primaryText flex justify-center">
          <p>Étape 4/4: Validation d&#39;inscription</p>
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

export default SubscribeFormV4;
