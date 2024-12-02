import { Link } from 'react-router-dom';
import MobileNavBar from '../MobileNavBar/MobileNavBar';
import Logo from '/img/logo-text-seniorlove.webp';

interface NavBarProps {
  isUserAuthenticated?: boolean;
}

export default function NavBar({ isUserAuthenticated }: NavBarProps) {
  // Buttons array
  const navBarButtons = [
    { text: 'Évènements', to: '/events' },
    { text: 'Se connecter', to: '/login' },
  ];
  
  const connectedNavBarButtons = [
    { text: 'Accueil', to: '/home' },
    { text: 'Découvrir', to: '/profiles' },
    { text: 'Évènements', to: '/events' },
    { text: 'Messages', to: '/messages' },
    { text: 'Mon profil', to: '/myProfile' },
  ];

  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav className="flex justify-center md:justify-between items-center w-full px-3">
        <Link to={isUserAuthenticated ? '/home' : '/'}>
          <img
            src={Logo}
            alt="Retour à l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div className="flex gap-6">
          {isUserAuthenticated ? (
            connectedNavBarButtons.map((button) => (
              <Link
                to={button.to}
                key={button.text}
                className="text-secondaryPink hover:text-primaryText font-bold py-2 px-3 hidden md:block"
              >
                {button.text}
              </Link>
            ))
          ) : (
            navBarButtons.map((button) => (
              <Link
                to={button.to}
                key={button.text}
                className="text-secondaryPink hover:text-primaryText font-bold py-2 px-3 hidden md:block"
              >
                {button.text}
              </Link>
            ))
          )}
        </div>
      </nav>
      {isUserAuthenticated ? (<MobileNavBar isUserAuthenticated />) : (<MobileNavBar />)}
    </header>
  );
}
