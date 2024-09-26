import { Link } from 'react-router-dom';
import Logo from '/icon/logo-pink-background.png';
import DiscoverLogo from '/icon/decouvrir.png';
import EventLogo from '/icon/evenement.png';
import MessageLogo from '/icon/messages.png';
import ProfileLogo from '/icon/mon-profil.png';

export default function MobileNavBarLogged() {
  const menuItems = [
    {
      logo: DiscoverLogo,
      alt: 'bouton découvrir',
      text: 'Découvrir',
      href: '/profiles',
    },
    {
      logo: MessageLogo,
      alt: 'bouton messages',
      text: 'Messages',
      href: '/messages',
    },
    { logo: Logo, alt: 'bouton accueil', text: 'Accueil', href: '/home' },
    {
      logo: EventLogo,
      alt: 'bouton connexion',
      text: 'Événements',
      href: '/events',
    },
    {
      logo: ProfileLogo,
      alt: 'bouton profile',
      text: 'Profil',
      href: '/myProfile',
    },
  ];

  return (
    <div className="bg-white shadow-mobileNav w-full px-3 pt-2 flex justify-around items-center text-primaryText fixed bottom-0 z-10 md:hidden">
      {menuItems.map((item) => (
        <Link to={item.href} key={item.text}>
          <img
            src={item.logo}
            alt={item.alt}
            className="mx-auto w-8 object-contain"
          />
          <p className="mb-1 text-sm text-primaryText text-center">
            {item.text}
          </p>
        </Link>
      ))}
    </div>
  );
}
