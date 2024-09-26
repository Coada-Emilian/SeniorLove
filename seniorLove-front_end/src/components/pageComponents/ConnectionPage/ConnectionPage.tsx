import { useEffect } from 'react';
import HeadbandV1 from '../../standaloneComponents/Headband/HeadbandV1';
import ConnectionDescriptionSection from './ConnectionDescriptionSection/ConnectionDescriptionSection';
import ConnectionFormSection from './ConnectionFormSection/ConnectionFormSection';

interface ConnectionPageProps {
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ConnectionPage({ setUserToken }: ConnectionPageProps) {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <main className="w-full">
      <ConnectionFormSection setUserToken={setUserToken} />

      <HeadbandV1 />

      <ConnectionDescriptionSection />
    </main>
  );
}
