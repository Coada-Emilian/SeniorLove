import { IUser } from '../../../../@types/IUser';

interface DescriptionSectionProps {
  user: IUser;
}

export default function DescriptionSection({ user }: DescriptionSectionProps) {
  return (
    <div>
      <h3 className="text-xl text-secondaryPink text-center font-semibold pb-3  md:text-left ">
        A propos de moi :
      </h3>

      <p className="text-primaryText text-justify italic">{user.description}</p>
    </div>
  );
}
