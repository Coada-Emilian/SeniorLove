// Purpose: Provide the main component for the home page when the user is logged in.

import { useEffect } from 'react';
import HeadbandV2 from '../../standaloneComponents/Headband/HeadbandV2';
import EventSection from './EventSection/EventSection';
import UsersSection from './UsersSection/UsersSection';

export default function HomePageLogged() {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <main className="w-full min-h-screen flex-grow flex flex-col justify-start items-center bg-backgroundPink pb-8">
      <UsersSection />

      <HeadbandV2 />

      <EventSection />
    </main>
  );
}
