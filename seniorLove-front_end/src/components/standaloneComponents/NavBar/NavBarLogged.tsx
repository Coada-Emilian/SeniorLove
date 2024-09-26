// NavBar V2 (after connexion)

import Logo from '/img/logo-text-seniorlove.webp';
import { Link, NavLink } from 'react-router-dom';
import MobileNavBarLogged from '../MobileNavBar/MobileNavBarLogged';

export default function NavBarLogged() {
  // Array of buttons in the navbar
  const NavBarButtons = [
    { text: 'Accueil', to: '/home' },
    { text: 'Découvrir', to: '/profiles' },
    { text: 'Évènements', to: '/events' },
    { text: 'Messages', to: '/messages' },
    { text: 'Mon profil', to: '/myProfile' },
  ];

  return (
    <header className="bg-white bg-opacity-90 md:sticky top-0 w-full py-4 z-10">
      <nav className="flex justify-center md:justify-between items-center w-full px-3">
        <Link to="/home">
          <img
            src={Logo}
            alt="Retour à l'accueil"
            className="max-w-36 lg:max-w-52"
          />
        </Link>

        <div className="flex gap-2 flex-wrap justify-end">
          {NavBarButtons.map((button) => (
            <NavLink
              to={button.to}
              key={button.text}
              className=" text-secondaryPink hover:text-primaryText font-semibold py-2 px-3 nav-link hidden md:block"
            >
              {button.text}
            </NavLink>
          ))}
        </div>
      </nav>

      <MobileNavBarLogged />
    </header>
  );
}
