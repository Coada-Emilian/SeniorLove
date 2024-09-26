import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import App from './App';
import axios from './axios';
import './index.css';
import NavBarLogged from './components/standaloneComponents/NavBar/NavBarLogged';
import NavBar from './components/standaloneComponents/NavBar/NavBar';
import Footer from './components/standaloneComponents/Footer/Footer';
import { getTokenAndDataFromLocalStorage } from './localStorage/localStorage';
import UserHeadband from './components/standaloneComponents/UserHeadband/UserHeadband';

// Set app element globally for modals
Modal.setAppElement('#root'); // Replace '#root' with your main app element's ID

export default function Root() {
  // State to track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // State to track user token
  const [userToken, setUserToken] = useState<string | null>(() => {
    const response = getTokenAndDataFromLocalStorage();
    return response?.token || null;
  });

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthentication = () => {
      // Get token from localStorage
      const response = getTokenAndDataFromLocalStorage();
      const token = response?.token;
      // Check if token matches localStorage token
      if (token && token === userToken) {
        setIsAuthenticated(true);
        // Set axios Authorization header
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      } else {
        // If token doesn't match, log out
        setIsAuthenticated(false);
        setUserToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    };

    // Run on component mount to check if token matches localStorage
    checkAuthentication();

    // Listen for changes to localStorage (e.g., via Chrome DevTools or another tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAuthentication();
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Poll localStorage periodically to catch any changes
    const intervalId = setInterval(checkAuthentication, 5000); // Check every 5 seconds

    return () => {
      // Remove event listener and clear interval on component unmount
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [userToken, isAuthenticated]);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <NavBarLogged />
          <UserHeadband setIsAuthenticated={setIsAuthenticated} />
        </>
      ) : (
        <NavBar />
      )}

      <App
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUserToken={setUserToken}
      />
      <Footer />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
