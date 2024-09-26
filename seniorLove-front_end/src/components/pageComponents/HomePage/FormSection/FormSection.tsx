import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../../axios';

import { IHobby } from '../../../../@types/IHobby';
import { IRegisterForm } from '../../../../@types/IRegisterForm';

import SubscribeFormV1 from './SubscribeForms/SubscribeFormV1';
import SubscribeFormV2 from './SubscribeForms/SubscribeFormV2';
import SubscribeFormV3 from './SubscribeForms/SubscribeFormV3';
import SubscribeFormV4 from './SubscribeForms/SubscribeFormV4';
import EndSection from './EndSection';

import Loader from '../../../standaloneComponents/Loader/Loader';
import Error500Page from '../../ErrorPages/Error500Page';

interface FormSectionProps {
  isForm1Validated: boolean;
  setIsForm1Validated: React.Dispatch<React.SetStateAction<boolean>>;
  isForm2Validated: boolean;
  setIsForm2Validated: React.Dispatch<React.SetStateAction<boolean>>;
  isForm3Validated: boolean;
  setIsForm3Validated: React.Dispatch<React.SetStateAction<boolean>>;
  isForm4Validated: boolean;
  setIsForm4Validated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormSection({
  isForm1Validated,
  setIsForm1Validated,
  isForm2Validated,
  setIsForm2Validated,
  isForm3Validated,
  setIsForm3Validated,
  isForm4Validated,
  setIsForm4Validated,
}: FormSectionProps) {
  // State to store the form data
  const [formData, setFormData] = useState({} as IRegisterForm);
  // State to store the hobbies data
  const [hobbies, setHobbies] = useState<IHobby[]>([]);
  // State to store the register error message
  const [registerError, setRegisterError] = useState<null | string>(null);
  // State to store the global form submission status
  const [isGlobalFormSubmitted, setIsGlobalFormSubmitted] =
    useState<boolean>(false);
  // State to store the loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to store the server error status
  const [serverError, setServerError] = useState(false);

  // Function to handle the form submission
  const fillFormData = (incomingData: object) => {
    setFormData((previousData) => {
      return { ...previousData, ...incomingData };
    });
  };

  // Functions to return to previous forms
  const returnToForm1 = () => {
    setIsForm1Validated(false);
  };
  const returnToForm2 = () => {
    setIsForm2Validated(false);
  };
  const returnToForm3 = () => {
    setIsForm3Validated(false);
  };
  const returnToForm4 = () => {
    setIsForm4Validated(false);
  };

  // Function to handle the global form submission
  useEffect(() => {
    const submitGlobalForm = async () => {
      try {
        // Attempt to post the formInfos object to the server
        // The 'Content-Type' header is set to 'multipart/form-data' to indicate that the request is sending form data
        await axios.post('/public/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // If the request is successful, clear any previous register error
        setRegisterError(null);
      } catch (e) {
        // Handle errors that occur during the request
        if (e instanceof AxiosError) {
          // Check if the error is an AxiosError, indicating an error response from the server
          if (e.response?.status === 400) {
            // If the server responds with a 400 status code, set a specific error message related to email already being registered
            setRegisterError(
              "L'adresse e-mail que vous avez renseigné correspond à un compte déjà créé. Essayez de vous connecter."
            );
          } else {
            // For other Axios errors, set a generic error message for the user
            setServerError(true);
          }
        }
        console.error(e);
      } finally {
        // Set the loading state to false to indicate that the request process has completed
        setIsLoading(false);
      }
    };
    // Check if the global form has been submitted
    if (isGlobalFormSubmitted) {
      // Call the submitGlobalForm function to handle the form submission
      submitGlobalForm();
    }
  }, [formData, isGlobalFormSubmitted]);

  // Function to fetch and save hobbies data
  useEffect(() => {
    const fetchAndSaveHobbiesData = async () => {
      try {
        // Attempt to fetch hobbies data from the server
        const result = await axios.get('/public/hobbies');
        // Map the hobbies data to add a false 'checked' property to each hobby object
        const hobbiesData = result.data.map((hobby: IHobby) => {
          return { ...hobby, checked: false };
        });
        // Set the hobbies state to the fetched data
        setHobbies(hobbiesData);
      } catch (e) {
        // Handle errors that occur during the request
        if (e instanceof AxiosError) {
          // Handle Axios-specific errors
          console.error('Axios error:', e.message);
        } else {
          // For other errors, set a generic server error
          console.error('Error:', e);
        }
        // Set the server error state to true
        setServerError(true);
      } finally {
        // Set loading state to false once the request is completed
        setIsLoading(false);
      }
    };
    // Call the function to fetch and save the hobbies data
    fetchAndSaveHobbiesData();
  }, []);

  // If there is a server error, display the 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  // If the loading state is true, display the loader component
  if (isLoading) {
    return (
      <section className=" justify-center md:items-center flex md:px-16 md:h-screen">
        <Loader />
      </section>
    );
  }

  // If the first form is not validated, show the first form
  if (!isForm1Validated) {
    return (
      <section className="bg-firstForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
        <div className="hidden md:block font-semibold text-2xl xl:text-4xl md:w-1/2 lg:2/3">
          <p>
            Rejoignez notre communauté dédiée aux seniors en quête de belles
            rencontres.
          </p>
          <p>Inscrivez-vous ici et commencez cette belle aventure !</p>
        </div>

        <SubscribeFormV1
          formData={formData}
          fillFormData={fillFormData}
          setIsForm1Validated={setIsForm1Validated}
        />
      </section>
    );
  }

  // If the second form is not validated, show the second form
  if (!isForm2Validated) {
    return (
      <section className="bg-secondForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
        <SubscribeFormV2
          hobbies={hobbies}
          setHobbies={setHobbies}
          setIsForm2Validated={setIsForm2Validated}
          onPreviousClick={returnToForm1}
          fillFormData={fillFormData}
        />
      </section>
    );
  }

  // If the third form is not validated, show the third form
  if (!isForm3Validated) {
    return (
      <section className="bg-thirdForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
        <SubscribeFormV3
          formData={formData}
          setIsForm3Validated={setIsForm3Validated}
          fillFormData={fillFormData}
          onPreviousClick={returnToForm2}
        />
      </section>
    );
  }
  // // if form 4 not yet validated, show form 4
  if (!isForm4Validated) {
    return (
      <section className="bg-fourthForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
        <SubscribeFormV4
          onPreviousClick={returnToForm3}
          fillFormData={fillFormData}
          setIsForm4Validated={setIsForm4Validated}
          setIsGlobalFormSubmitted={setIsGlobalFormSubmitted}
        />
      </section>
    );
  }

  return (
    <section className="bg-endForm bg-cover bg-no-repeat bg-center text-white content-center justify-center md:items-center gap-12 flex md:px-16 md:h-screen flex-1">
      <EndSection onPreviousClick={returnToForm4} error={registerError} />
    </section>
  );
}
