import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../../../../axios';
import ProfileSticker from '../../../standaloneComponents/ProfileSticker/ProfileSticker';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import Loader from '../../../standaloneComponents/Loader/Loader';
import {
  getTokenAndDataFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../../../../localStorage/localStorage';
import { IUser } from '../../../../@types/IUser';
import Error500Page from '../../ErrorPages/Error500Page';

export default function UsersSection() {
  // Get data from local storage
  const response = getTokenAndDataFromLocalStorage();

  // Get token from the response
  const token = response?.token;

  // State for users data
  const [users, setUsers] = useState<IUser[]>([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for server error
  const [serverError, setServerError] = useState(false);
  // State for number of profiles to display
  const [numProfiles, setNumProfiles] = useState(3);

  // Import of navigate to force redirection when forced logged out
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const responseFetch = await axios.get('/private/users/me/suggestions');
        setUsers(responseFetch.data);
      } catch (e) {
        console.error(e);
        if (
          // Check if the error is an AxiosError and if the user is blocked or not logged in
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

    // If token is present, fetch users
    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    // Check window size to adapt number of profiles on screen
    const updateNumProfiles = () => {
      if (window.innerWidth >= 1280) {
        setNumProfiles(8);
      } else if (window.innerWidth >= 1024) {
        setNumProfiles(6);
      } else if (window.innerWidth >= 640) {
        setNumProfiles(4);
      } else {
        setNumProfiles(3);
      }
    };

    // Set initial value
    updateNumProfiles();
    // Update on resize
    window.addEventListener('resize', updateNumProfiles);

    // Remove event listener on unmount
    return () => window.removeEventListener('resize', updateNumProfiles);
  }, []);

  // If server error, display 500 error page
  if (serverError) {
    return <Error500Page />;
  }

  // If loading, display loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center mx-auto w-11/12 pb-8">
        {users.slice(0, numProfiles).map((user) => (
          <ProfileSticker user={user} key={user.id} />
        ))}
      </div>

      <Link to="/profiles">
        <DefaultBtn btnText="Voir plus de profils" />
      </Link>
    </div>
  );
}
