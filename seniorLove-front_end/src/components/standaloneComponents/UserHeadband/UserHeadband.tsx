import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getTokenAndDataFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../../../localStorage/localStorage';

interface UserHeadbandProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserHeadband({
  setIsAuthenticated,
}: UserHeadbandProps) {
  // State to track user picture and name
  const [newPictureUrl, setNewPictureUrl] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPicture = () => {
      // Get user data from localStorage
      const response = getTokenAndDataFromLocalStorage();
      const { name, picture_url } = response || {
        name: null,
        picture_url: null,
      };
      // Set user picture and name
      setNewPictureUrl(picture_url);
      setNewName(name);
    };

    // Fetch immediately on mount
    fetchPicture();

    // Set up an interval to fetch data periodically every second
    const intervalId = setInterval(fetchPicture, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const onClickDisconnect = () => {
    setIsAuthenticated(false);
    removeTokenFromLocalStorage();
  };
  
  return (
    <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 p-2 w-full font-bold text-primaryText">
      <div className="flex items-center justify-center space-x-4">
        <Link to="/myprofile">
          <img
            src={newPictureUrl ?? ''}
            alt={newName ?? ''}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover shadow-around"
          />
        </Link>

        <div>
          <p className="italic text-base font-normal md:text-lg lg:text-xl">
            Bienvenue {newName} !
          </p>

          <Link
            to="/"
            onClick={() => onClickDisconnect()}
            className="text-sm md:text-lg text-secondaryPink hover:text-primaryText font-semibold py-2 px-3"
          >
            Déconnexion
          </Link>
        </div>
      </div>
    </div>
  );
}
