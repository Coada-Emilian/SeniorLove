// NavBar V1 (before connexion)

import { Link } from 'react-router-dom';
import MobileNavBar from '../MobileNavBar/MobileNavBar';
import Logo from '/img/logo-text-seniorlove.webp';

export default function NavBar() {
  // Buttons array
  const NavBarButtons = [
    { text: 'Évènements', to: '/events' },
    { text: 'Se connecter', to: '/login' },
  ];

  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav className="flex justify-center md:justify-between items-center w-full px-3">
        <Link to="/">
          <img
            src={Logo}
            alt="Retour à l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div className="flex gap-6">
          {NavBarButtons.map((button) => (
            <Link
              to={button.to}
              key={button.text}
              className="text-secondaryPink hover:text-primaryText font-bold py-2 px-3 hidden md:block"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </nav>
      <MobileNavBar />
    </header>
  );
}
