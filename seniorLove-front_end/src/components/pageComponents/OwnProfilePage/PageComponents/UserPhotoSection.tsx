import { IUser } from '../../../../@types/IUser';
import Loader from '../../../standaloneComponents/Loader/Loader';
import editLogo from '/icon/edit.svg';

interface UserPhotoSectionProps {
  isEditing: boolean;
  isPhotoLoading: boolean;
  modifiedPhotoUrl: string | null;
  me: IUser | null;
  setIsImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserPhotoSection({
  isEditing,
  isPhotoLoading,
  modifiedPhotoUrl,
  me,
  setIsImageModalOpen,
}: UserPhotoSectionProps) {
  return (
    <div className="relative">
      {isPhotoLoading ? (
        <Loader />
      ) : (
        <>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsImageModalOpen(true);
              }}
              className="bg-white border border-gray-300 shadow p-1 rounded-2xl absolute top-2 left-2"
            >
              <img src={editLogo} alt="edit" className="w-6 h-6" />
            </button>
          )}

          <img
            src={modifiedPhotoUrl || (me ? me.picture_url : '')}
            alt={me ? me.name : 'User photo'}
            className="max-w-64 md:max-w-full rounded-3xl shadow-2xl"
          />
        </>
      )}
    </div>
  );
}
