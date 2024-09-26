import { useState } from 'react';

export default function AgeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenAge, setChosenAge] = useState(0);
  const ages = Array.from({ length: 31 }, (_, i) => i + 60);

  const handleAgeClick = (age: number) => {
    setChosenAge(age);
    setIsOpen(false); // Optionally close the dropdown after selecting
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-primaryText shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {chosenAge || 'Age'}
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {ages.map((age) => (
              <button
                type="button"
                key={age}
                className="block px-4 py-2 text-sm text-primaryText hover:bg-gray-100"
                onClick={() => handleAgeClick(age)}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
