import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../../axios';
import { setTokenAndDataInLocalStorage } from '../../../../localStorage/localStorage';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import Error500Page from '../../ErrorPages/Error500Page';
import Logo from '/img/logo-text-seniorlove.webp';
import openedEyeIcon from '/icon/eye.svg';
import closedEyeIcon from '/icon/eye-closed.svg';

interface ConnectionFormSectionProps {
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ConnectionFormSection({
  setUserToken,
}: ConnectionFormSectionProps) {
  // State to manage error message display
  const [errorLog, setErrorLog] = useState<boolean>(false);
  // State to manage server error message display
  const [serverError, setServerError] = useState(false);
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook to navigate to another page
  const navigate = useNavigate();

  // Function to check credentials
  const checkCredentials = async (email: string, password: string) => {
    try {
      // Reset error messages
      setErrorLog(false);
      // Send request to server
      const response = await axios.post('/public/login', {
        email,
        password,
      });
      // Set token in local storage and set token in state
      setTokenAndDataInLocalStorage(
        response.data.token,
        response.data.name,
        response.data.picture_url,
        response.data.id
      );
      // Set token in state to manage user connection, and navigate to home page
      setUserToken(response.data.token);
      setErrorLog(false);
      navigate('/home');
    } catch (e) {
      // If status is 401, it means email and/or password are invalid
      if (e instanceof AxiosError && e.response?.status === 401) {
        console.error(e);
        setErrorLog(true);
      } else {
        // If status is not 401, it means there is a server error
        console.error(e);
        setServerError(true);
      }
    }
  };

  // If server error, display 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  return (
    <section className="bg-connectionForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
      <div className="md:block md:w-1/2 lg:2/3">
        <div className="bg-white opacity-90 p-10 text-primaryText rounded-xl shadow-md my-10 mx-4 md:mx-auto md:my-0 md:max-w-lg">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src={Logo} alt="" className="max-w-44 mb-4" />
          </div>

          <p className="mb-4 text-lg font-semibold text-center uppercase">
            Connexion
          </p>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const formData = new FormData(form);
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              await checkCredentials(email, password);
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium leading-6 text-primaryText"
              >
                Adresse e-mail
              </label>

              <div className="mt-2">
                <div className="flex bg-white rounded-md shadow-sm border">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Adresse e-mail"
                    className="block w-full border-0 bg-transparent py-1.5 p-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg font-medium leading-6 text-primaryText"
              >
                Mot de passe
              </label>

              <div className="mt-2">
                <div className="flex justify-between bg-white rounded-md shadow-sm border">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    className="block w-full border-0 bg-transparent py-1.5 p-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
              </div>
            </div>

            {errorLog ? (
              <p className="text-center text-red-600 font-semibold">
                Email et/ou Mot de passe invalide
              </p>
            ) : null}

            <div className="flex justify-center mt-6 mb-2">
              <DefaultBtn btnText="Connexion" btnType="submit" />
            </div>
          </form>

          <div className="connexion_paragraph text-base mb-4 text-center">
            <p>
              Pas encore membre?{' '}
              <Link to="/" className="text-secondaryPink">
                Inscrivez-vous ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
