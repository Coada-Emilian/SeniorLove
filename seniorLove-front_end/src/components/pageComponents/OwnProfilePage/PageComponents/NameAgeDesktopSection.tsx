import { IUser } from '../../../../@types/IUser';
import editLogo from '/icon/edit.svg';

interface NameAgeDesktopSectionProps {
  isEditing: boolean;
  newName: string;
  me: IUser | null;
  setIsNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NameAgeDesktopSection({
  isEditing,
  newName,
  me,
  setIsNameModalOpen,
}: NameAgeDesktopSectionProps) {
  return (
    <div>
      {isEditing ? (
        <button
          type="button"
          onClick={() => {
            setIsNameModalOpen(true);
          }}
          className="p-1 rounded-2xl"
        >
          <div className="flex gap-2 items-center">
            <img src={editLogo} alt="edit" className="w-6 h-6" />
            <span className="text-3xl text-secondaryPink hover:text-secondaryPinkHover">
              {newName}
            </span>
          </div>
        </button>
      ) : (
        <div className="text-xl text-primaryText">
          {me && (
            <>
              <span className="text-3xl text-secondaryPink">{me.name}</span>,{' '}
              {me.age} ans
            </>
          )}
        </div>
      )}
    </div>
  );
}
