import { useState, useEffect } from 'react';
import DisplayUsers from './DisplayUsers/DisplayUsers';
import FilterPanel from './FilterPanel/FilterPanel';
import { IFilteredUser } from '../../../@types/IFilteredUser';

export default function ProfilesPage() {
  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const [filteredUsers, setFilteredUsers] = useState<IFilteredUser[]>([
    {
      gender: 'allGenders',
      age: '0',
    },
  ]);

  return (
    <main className="w-full min-h-screen flex-grow flex flex-col justify-start items-center bg-backgroundPink">
      <FilterPanel setFilteredUsers={setFilteredUsers} />

      <DisplayUsers filteredUsers={filteredUsers} />
    </main>
  );
}
