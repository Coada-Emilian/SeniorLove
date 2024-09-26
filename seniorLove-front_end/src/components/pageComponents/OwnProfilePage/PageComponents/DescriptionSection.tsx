import { IUser } from '../../../../@types/IUser';
import editLogo from '/icon/edit.svg';

interface DescriptionSectionProps {
  isEditing: boolean;
  newDescription: string;
  me: IUser | null;
  setIsDescriptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DescriptionSection({
  isEditing,
  newDescription,
  me,
  setIsDescriptionModalOpen,
}: DescriptionSectionProps) {
  return (
    <div className="description">
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={() => {
              setIsDescriptionModalOpen(true);
            }}
            className="p-1 rounded-2xl"
          >
            <div className="flex gap-2 justify-center md:text-left">
              <img src={editLogo} alt="edit" className="w-6 h-6" />
              <h3 className="text-xl text-secondaryPink hover:text-secondaryPinkHover text-center font-semibold pb-3 md:text-left ">
                A propos de moi :
              </h3>
            </div>
          </button>

          <p className="text-primaryText text-justify break-words">
            {newDescription}
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl text-secondaryPink text-center font-semibold pb-3 md:text-left ">
            A propos de moi :
          </h3>

          <p className="text-primaryText text-justify break-words italic">
            {me ? me.description : ''}
          </p>
        </>
      )}
    </div>
  );
}
