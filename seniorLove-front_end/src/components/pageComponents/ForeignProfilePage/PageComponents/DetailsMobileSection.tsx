import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface DetailsMobileSectionProps {
  user: IUser;
  handleMessageToggle: () => void;
  isMessageSent: boolean;
  errorMessage: boolean;
  messageFieldMobile: string;
  setMessageFieldMobile: React.Dispatch<React.SetStateAction<string>>;
}

export default function DetailsMobileSection({
  user,
  handleMessageToggle,
  isMessageSent,
  errorMessage,
  messageFieldMobile,
  setMessageFieldMobile,
}: DetailsMobileSectionProps) {
  return (
    <div className="font-semibold flex flex-col text-center justify-between md:hidden">
      <div className="text-primaryText text-xl">
        <span className="text-3xl text-secondaryPink">{user.name}</span>,{' '}
        {user.age} ans
      </div>

      <div className="pt-4">
        <DefaultBtn
          btnText="Envoyer un message"
          btnPage="profile"
          onClick={handleMessageToggle}
          btnMessage={isMessageSent}
        />
      </div>

      {isMessageSent ? (
        <>
          {errorMessage && (
            <p className="text-red-500 text-xs text-center mt-2">
              Ce contact n&apos;est plus disponible pour recevoir des messages.
            </p>
          )}
          <textarea
            rows={5}
            name="messageFieldMobile"
            id="messageFieldMobile"
            value={messageFieldMobile}
            onChange={(e) => setMessageFieldMobile(e.target.value)}
            placeholder="Écrire votre message ici"
            className="p-2 my-2 font-normal min-w-72 max-w-96 rounded-md shadow-md"
          />
        </>
      ) : null}
    </div>
  );
}
