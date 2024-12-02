import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/pageComponents/HomePage/HomePage';
import EventsPage from './components/pageComponents/EventsPage/EventsPage';
import HomePageLogged from './components/pageComponents/HomePageLogged/HomePageLogged';
import ProfilesPage from './components/pageComponents/ProfilesPage/ProfilesPage';
import ProfilePage from './components/pageComponents/ForeignProfilePage/ForeignProfilePage';
import OwnProfilePage from './components/pageComponents/OwnProfilePage/OwnProfilePage';
import ConnexionPage from './components/pageComponents/ConnectionPage/ConnectionPage';
import EventPage from './components/pageComponents/EventPage/EventPage';
import Error404Page from './components/pageComponents/ErrorPages/Error404Page';
import ErrorAuthPage from './components/pageComponents/ErrorPages/ErrorAuthPage';
import MessagePage from './components/pageComponents/MessagesPage/MessagePage';
import CommunityGuidelinesPage from './components/pageComponents/FooterPages/CommunityGuidelinesPage';
import SignalIllegalContentPage from './components/pageComponents/FooterPages/SignalIllegalContentPage';
import ConfidentialityPage from './components/pageComponents/FooterPages/ConfidentialityPage';
import GeneralConditionsPage from './components/pageComponents/FooterPages/GeneralConditionsPage';
import CookieUsePolicyPage from './components/pageComponents/FooterPages/CookieUsePolicyPage';
import Footer from './components/standaloneComponents/Footer/Footer';
import NavBar from './components/standaloneComponents/NavBar/NavBar';
import UserHeadband from './components/standaloneComponents/UserHeadband/UserHeadband';
import { useEffect, useState } from 'react';
import { getTokenAndDataFromLocalStorage } from './localStorage/localStorage';
import axios from './axios';

export default function App() {
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
    <>
     {isAuthenticated ? (
        <>
          <NavBar isUserAuthenticated />
          <UserHeadband setIsAuthenticated={setIsAuthenticated} />
        </>
      ) : (
          <NavBar/>
      )}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePageLogged />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/profiles/:userId" element={<ProfilePage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route
              path="/myProfile"
              element={<OwnProfilePage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/events"
              element={<EventsPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/events/:id"
              element={<EventPage isAuthenticated={isAuthenticated} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<ConnexionPage setUserToken={setUserToken} />}
            />
            <Route
              path="/events"
              element={<EventsPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/events/:id"
              element={<EventPage isAuthenticated={isAuthenticated} />}
            />
          </>
        )}

        <Route path="/guidelines" element={<CommunityGuidelinesPage />} />
        <Route path="/signal" element={<SignalIllegalContentPage />} />
        <Route path="/confidentiality" element={<ConfidentialityPage />} />
        <Route path="/conditions" element={<GeneralConditionsPage />} />
        <Route path="/cookies" element={<CookieUsePolicyPage />} />
        <Route path="/loggedOut" element={<ErrorAuthPage />} />

        <Route
          path="*"
          element={<Error404Page isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    <Footer />
    </>
  );
}
