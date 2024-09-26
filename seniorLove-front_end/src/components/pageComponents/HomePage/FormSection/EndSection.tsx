import { Link } from 'react-router-dom';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import Logo from '/img/logo-text-seniorlove.webp';

interface EndSectionProps {
  onPreviousClick: () => void;
  error: null | string;
}

export default function EndSection({
  error,
  onPreviousClick,
}: EndSectionProps) {
  return (
    <div className="bg-white opacity-90 px-10 pb-10 pt-4 rounded-xl shadow-md my-10 mx-4 md:mx-auto md:my-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={Logo} alt="senior love icon" className="max-w-44 mb-4" />
      </div>

      {error ? (
        <>
          <p className="mb-4 text-lg text-primaryText font-semibold text-center uppercase">
            Une erreur est survenue lors de l'inscription.
          </p>
          <p className="mb-4 text-lg text-primaryText font-semibold text-center">
            {error}
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 text-lg text-primaryText font-semibold text-center uppercase">
            Votre inscription est en cours de traitement.
          </p>
          <p className="mb-4 text-lg text-primaryText font-semibold text-center">
            Une fois votre profil validé, vous pourrez vous connecter.
          </p>
        </>
      )}

      <div className="flex justify-center mt-6 mb-2">
        <Link to="/login">
          <DefaultBtn btnType="button" btnText="Me connecter" />
        </Link>
      </div>

      {error ? (
        <div className="flex justify-center text-secondaryPink mt-1">
          <button type="button" onClick={onPreviousClick}>
            Revenir à l&#39;étape précédente
          </button>
        </div>
      ) : (
        <div className="flex justify-center text-secondaryPink mt-1">
          <Link to="/" onClick={() => window.location.reload()}>
            Revenir à l&#39;accueil
          </Link>
        </div>
      )}
    </div>
  );
}
