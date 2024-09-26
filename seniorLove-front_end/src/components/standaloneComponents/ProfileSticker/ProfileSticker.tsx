import { Link } from 'react-router-dom';
import { IUser } from '../../../@types/IUser';
import messageIcon from '/icon/messages.png';

interface ProfileStickerProps {
  user: IUser;
}

function ProfileSticker({ user }: ProfileStickerProps) {
  return (
    <Link
      to={`/profiles/${user.id}`}
      state={{ user }}
      className="h-72 w-72 2xl:w-80 mx-auto"
    >
      <div className="h-72 w-72 2xl:w-80 rounded-xl mx-auto shadow-lg relative">
        <img
          src={user.picture_url}
          alt={user.name}
          className="object-cover rounded-xl h-72 w-72 2xl:w-80"
        />

        <div className="m-2 w-fit absolute bottom-0 left-1 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-2xl font-medium">
          {user.name}, {user.age}
        </div>

        <button
          type="button"
          className="p-1 shadow-lg absolute -bottom-4 right-0 bg-white rounded-full size-12"
        >
          <img
            src={messageIcon}
            alt="message"
            className="size-8 items-center mx-auto"
          />
        </button>
      </div>
    </Link>
  );
}
export default ProfileSticker;
