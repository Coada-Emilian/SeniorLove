import { IEvent } from '../../../../@types/IEvent';
import { IUser } from '../../../../@types/IUser';
import EventSticker from '../../../standaloneComponents/EventSticker/EventSticker';

interface EventsSectionProps {
  user: IUser;
}
export default function EventsSection({ user }: EventsSectionProps) {
  return (
    <div className="pt-8">
      <h3 className="text-xl text-secondaryPink text-center font-semibold pb-3">
        Mes prochaines sorties :
      </h3>
      {user.events && user.events.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 py-5">
          {user.events.map((event: IEvent) => (
            <EventSticker event={event} key={event.id} page="profile" />
          ))}
        </div>
      ) : (
        <p className="text-center py-6 italic text-primaryText">
          Je ne suis actuellement enregistré à aucun futur événement.
        </p>
      )}
    </div>
  );
}
