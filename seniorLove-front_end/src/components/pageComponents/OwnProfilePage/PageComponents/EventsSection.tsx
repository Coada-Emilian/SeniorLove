import { IUser } from '../../../../@types/IUser';
import EventSticker from '../../../standaloneComponents/EventSticker/EventSticker';

interface EventsSectionProps {
  me: IUser | null;
}

export default function EventsSection({ me }: EventsSectionProps) {
  return (
    <div className="events pt-8">
      <h3 className="text-xl text-secondaryPink text-center font-semibold pb-3">
        Mes prochaines sorties :
      </h3>

      {me && me.events && me.events.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 pt-5">
          {me.events.map((event) => (
            <EventSticker event={event} key={event.id} page="profile" />
          ))}
        </div>
      ) : (
        <p className="text-center pt-6 italic text-primaryText">
          Je ne suis actuellement enregistré à aucun futur événement.
        </p>
      )}
    </div>
  );
}
