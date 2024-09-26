// Purpose: Unconnected home page component

import { useEffect, useState } from 'react';
import HeadbandV1 from '../../standaloneComponents/Headband/HeadbandV1';
import DescriptionSection from './DescriptionSection/DescriptionSection';
import FormSection from './FormSection/FormSection';
import HeadbandV2 from '../../standaloneComponents/Headband/HeadbandV2';

export default function HomePage() {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // States to track form validation
  const [isForm1Validated, setIsForm1Validated] = useState(false);
  const [isForm2Validated, setIsForm2Validated] = useState(false);
  const [isForm3Validated, setIsForm3Validated] = useState(false);
  const [isForm4Validated, setIsForm4Validated] = useState(false);

  return (
    <main className="w-full">
      <FormSection
        isForm1Validated={isForm1Validated}
        setIsForm1Validated={setIsForm1Validated}
        isForm2Validated={isForm2Validated}
        setIsForm2Validated={setIsForm2Validated}
        isForm3Validated={isForm3Validated}
        setIsForm3Validated={setIsForm3Validated}
        isForm4Validated={isForm4Validated}
        setIsForm4Validated={setIsForm4Validated}
      />

      {isForm1Validated ? <HeadbandV2 /> : <HeadbandV1 />}

      <DescriptionSection
        isForm1Validated={isForm1Validated}
        isForm2Validated={isForm2Validated}
        isForm3Validated={isForm3Validated}
      />
    </main>
  );
}
