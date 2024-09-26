import { Link } from 'react-router-dom';

interface ReceivedMessageProps {
  receivedMessage: string;
  displayedContactId: number;
  displayedContactPictureUrl: string;
}

export default function ReceivedMessage({
  receivedMessage,
  displayedContactId,
  displayedContactPictureUrl,
}: ReceivedMessageProps) {
  return (
    <Link to={`/profiles/${displayedContactId}`}>
      <div className="m-4 flex gap-2 justify-start md:w-2/3 mr-2 self-start">
        <img
          src={displayedContactPictureUrl}
          alt="foreign profile"
          className="aspect-square rounded-full w-10 h-10 self-center md:w-20 md:h-20 object-cover shadow-md"
        />

        <div className="p-2 md:p-4 bg-secondaryPink border shadow-around rounded-md self-center">
          <p className="text-sm text-white">{receivedMessage}</p>
        </div>
      </div>
    </Link>
  );
}
