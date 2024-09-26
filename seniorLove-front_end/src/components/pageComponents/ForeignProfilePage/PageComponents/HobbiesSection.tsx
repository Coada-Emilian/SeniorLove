import { IUser } from '../../../../@types/IUser';

interface HobbiesSectionProps {
  user: IUser;
}

export default function HobbiesSection({ user }: HobbiesSectionProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl text-center font-semibold text-secondaryPink pb-3">
        Mes Centres d&apos;intérêt
      </h2>

      <div className="flex flex-wrap justify-around gap-2">
        {user.hobbies.map((hobby: { id: string; name: string }) => (
          <span
            key={hobby.id}
            className="bg-primaryPink text-primaryText font-medium rounded-lg text-sm py-1 px-2"
          >
            {hobby.name}
          </span>
        ))}
      </div>
    </div>
  );
}
