import { Link } from 'react-router-dom';

interface NotFoundPageProps {
  isAuthenticated: boolean;
}

export default function NotFoundPage({ isAuthenticated }: NotFoundPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full flex-grow text-center text-primaryText my-20">
      <h1 className="text-3xl font-semibold mb-20">
        🐔 Oups ! Erreur 404. Cette page a pris la poudre d&apos;escampette...
        comme une poule effrayée ! 🐔
      </h1>

      <div className="mx-20">
        {' '}
        <p className="text-lg mb-2">
          Pas de panique, il semble que la page que vous cherchez se soit
          envolée du poulailler.
        </p>
        <p className="text-lg mb-2">👉 Voici ce que vous pouvez faire :</p>
        <ul className="list-disc list-inside text-left mx-4 mb-6">
          <li>
            Retourner au{' '}
            {isAuthenticated ? (
              <Link to="/home" className="text-secondaryPink">
                nid d&apos;accueil{' '}
              </Link>
            ) : (
              <Link to="/" className="text-secondaryPink">
                nid d&apos;accueil{' '}
              </Link>
            )}
            pour commencer à nouveau.
          </li>

          <li>
            Gratter un peu dans notre{' '}
            <Link to="/events" className="text-secondaryPink">
              section des événements
            </Link>{' '}
            pour découvrir des rencontres à venir.
          </li>

          {!isAuthenticated && (
            <li>
              Ou picorer dans nos sections populaires comme{' '}
              <Link to="/login" className="text-secondaryPink">
                se connecter
              </Link>{' '}
              ou{' '}
              <Link to="/" className="text-secondaryPink">
                s&apos;inscrire
              </Link>{' '}
              pour rejoindre notre communauté.
            </li>
          )}
        </ul>
      </div>

      <p className="text-lg mb-6">
        Toujours perdu ? Contactez notre{' '}
        <Link to="/signal" className="text-secondaryPink">
          support
        </Link>{' '}
        et nous vous aiderons à retrouver votre chemin !
      </p>
    </div>
  );
}
