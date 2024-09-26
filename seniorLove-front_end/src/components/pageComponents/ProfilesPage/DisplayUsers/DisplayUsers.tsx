import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../../../../axios';
import {
  getTokenAndDataFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../../../../localStorage/localStorage';
import { IUser } from '../../../../@types/IUser';
import { IFilteredUser } from '../../../../@types/IFilteredUser';
import Loader from '../../../standaloneComponents/Loader/Loader';
import Error500Page from '../../ErrorPages/Error500Page';
import ProfileSticker from '../../../standaloneComponents/ProfileSticker/ProfileSticker';

interface DisplayUsersProps {
  filteredUsers: IFilteredUser[];
}

export default function DisplayUsers({ filteredUsers }: DisplayUsersProps) {
  // Get the token from the local storage
  const response = getTokenAndDataFromLocalStorage();
  // Get the token from the response
  const token = response?.token;

  // State for the users
  const [users, setUsers] = useState<IUser[]>([]);
  // State for the loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for the server error
  const [serverError, setServerError] = useState(false);

  // Hook to navigate between pages
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the users
    const fetchUsers = async () => {
      try {
        const responseFetch = await axios.get('/private/users/me/suggestions');
        setUsers(responseFetch.data);
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
    // If the token exists, fetch the users
    if (token) {
      fetchUsers();
    }
  }, [navigate, token]);

  const filteredUsersArray = users.filter((user) => {
    // Filter the users by gender
    const genderSort =
      user.gender === filteredUsers[0].gender ||
      filteredUsers[0].gender === 'allGenders';

    // Filter the users by age
    const ageSort =
      filteredUsers[0].age === '0' ||
      (filteredUsers[0].age === '80'
        ? user.age >= 80
        : user.age >= Number(filteredUsers[0].age) &&
          user.age <= Number(filteredUsers[0].age) + 9);

    return genderSort && ageSort;
  });

  if (serverError) {
    return <Error500Page />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-10">
      {filteredUsersArray.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun utilisateur ne correspond à vos critères de recherche.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center mx-auto w-11/12 pb-8">
          {filteredUsersArray.map((user) => (
            <ProfileSticker user={user} key={user.picture_url} />
          ))}
        </div>
      )}
    </div>
  );
}
