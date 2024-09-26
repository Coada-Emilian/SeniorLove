import { IHobby } from '../../../../@types/IHobby';
import { IUser } from '../../../../@types/IUser';
import editLogo from '/icon/edit.svg';

interface HobbiesSectionProps {
  isEditing: boolean;
  newHobbies: IHobby[];
  me: IUser | null;
  setIsHobbyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HobbiesSection({
  isEditing,
  newHobbies,
  me,
  setIsHobbyModalOpen,
}: HobbiesSectionProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center justify-center w-full">
        {isEditing ? (
          <button
            type="button"
            onClick={() => {
              setIsHobbyModalOpen(true);
            }}
          >
            <h2 className="text-xl w-full flex gap-2 font-semibold text-secondaryPink hover:text-secondaryPinkHover pb-3 text-center">
              <img src={editLogo} alt="edit" className="w-6 h-6" />
              Modifiez vos centres d&apos;intérêt
            </h2>
          </button>
        ) : (
          <h2 className="text-xl w-full font-semibold text-secondaryPink pb-3 text-center">
            Mes Centres d&apos;intérêt
          </h2>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 text-primaryText font-medium text-sm">
        {newHobbies.length > 0
          ? newHobbies.map((hobby) => (
              <span
                key={hobby.id}
                className="bg-primaryPink rounded-lg py-1 px-2"
              >
                {hobby.name}
              </span>
            ))
          : me!.hobbies.map((hobby: IHobby) => (
              <span
                key={hobby.id}
                className="bg-primaryPink rounded-lg py-1 px-2"
              >
                {hobby.name}
              </span>
            ))}
      </div>
    </div>
  );
}
