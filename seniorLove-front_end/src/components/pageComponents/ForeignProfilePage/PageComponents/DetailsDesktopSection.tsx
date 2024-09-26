import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface DetailsDesktopSectionProps {
  user: IUser;
  handleMessageToggle: () => void;
  isMessageSent: boolean;
  errorMessage: boolean;
  messageField: string;
  setMessageField: React.Dispatch<React.SetStateAction<string>>;
}

export default function DetailsDesktopSection({
  user,
  handleMessageToggle,
  isMessageSent,
  errorMessage,
  messageField,
  setMessageField,
}: DetailsDesktopSectionProps) {
  return (
    <>
      <div className="hidden font-semibold md:flex text-center justify-between">
        <div className="text-primaryText text-xl">
          <span className="text-3xl text-secondaryPink">{user.name}</span>,{' '}
          {user.age} ans
        </div>

        <div className="flex gap-3">
          <DefaultBtn
            btnText="Envoyer un message"
            btnPage="profile"
            onClick={handleMessageToggle}
            btnMessage={isMessageSent}
          />
        </div>
      </div>

      {isMessageSent && (
        <>
          {errorMessage && (
            <p className="text-red-500 text-xs text-center mt-2">
              Ce contact n&apos;est plus disponible pour recevoir des messages.
            </p>
          )}

          <textarea
            rows={3}
            name="messageField"
            value={messageField}
            onChange={(e) => setMessageField(e.target.value)}
            placeholder="Écrire votre message ici"
            className="p-2 my-2 hidden md:block"
          />
        </>
      )}
    </>
  );
}
