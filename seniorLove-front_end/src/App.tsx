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

interface AppProps {
  isAuthenticated: boolean;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function App({
  isAuthenticated,
  setUserToken,
  setIsAuthenticated,
}: AppProps) {
  return (
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
  );
}
