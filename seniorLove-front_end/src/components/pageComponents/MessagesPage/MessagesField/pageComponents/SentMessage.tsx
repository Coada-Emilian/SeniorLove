interface SentMessageProps {
  sentMessage: string;
  ownProfilePictureUrl: string;
}

function SentMessage({ sentMessage, ownProfilePictureUrl }: SentMessageProps) {
  return (
    <div className="m-4 flex gap-2 justify-end md:w-2/3 ml-2 self-end">
      <div className="p-2 md:p-4 bg-white border shadow-around rounded-md self-center">
        <p className="text-sm text-primaryText">{sentMessage}</p>
      </div>
      <img
        src={ownProfilePictureUrl}
        alt="own profile"
        className="aspect-square rounded-full w-10 h-10 self-center md:w-20 md:h-20 object-cover shadow-md"
      />
    </div>
  );
}

export default SentMessage;
