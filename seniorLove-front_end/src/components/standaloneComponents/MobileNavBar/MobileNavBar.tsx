// MobileFooterMenu V1 (before connexion)

import Logo from '/icon/logo-pink-background.png';
import ConnexionLogo from '/icon/connexion.png';
import EventLogo from '/icon/evenement.png';

export default function MobileNavBar() {
  const menuItems = [
    {
      logo: EventLogo,
      alt: 'bouton connexion',
      text: 'Événements',
      href: '/events',
    },
    { logo: Logo, alt: 'bouton accueil', text: 'Accueil', href: '/' },
    {
      logo: ConnexionLogo,
      alt: 'bouton connexion',
      text: 'Connexion',
      href: '/login',
    },
    
  ];
  return (
    <div className="bg-white shadow-mobileNav w-full px-3 pt-2 flex justify-around items-center text-primaryText fixed bottom-0 z-10 md:hidden">
      {menuItems.map((item) => (
        <a href={item.href} key={item.text}>
          <img
            src={item.logo}
            alt={item.alt}
            className="mx-auto w-8 object-contain"
          />
          <p className="mb-1 text-sm text-primaryText text-center">
            {item.text}
          </p>
        </a>
      ))}
    </div>
  );
}
