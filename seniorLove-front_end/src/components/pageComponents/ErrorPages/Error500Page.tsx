import { Link } from 'react-router-dom';

export default function ErrorServerPage() {
  return (
    <div className="flex flex-col items-center min-h-full flex-grow text-center text-primaryText my-20">
      <h1 className="text-3xl font-semibold mb-20">
        🐔 Oups ! Le serveur fait l&apos;autruche... 🐔
      </h1>
      <div className="mx-20">
        <p className="text-lg mb-2">
          Pas de panique, il a peut-être juste fait un petit tour au poulailler.
          Retentez plus tard, le temps que nos équipes remettent tout ça en
          ordre !
        </p>
      </div>

      <p className="text-lg mb-6">
        Ce problème vous fait perdre des plumes ? Contactez notre{' '}
        <Link to="/signal" className="text-secondaryPink">
          équipe de choc
        </Link>{' '}
        et nous vous aiderons à sortir de cette coquille !
      </p>
    </div>
  );
}
