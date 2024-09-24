// Purpose: Compute age from birth date

export default function computeAge(birthDate) {
  // Check if birthDate is a string
  if (!birthDate || typeof birthDate !== 'string') {
    throw new Error('Error: No input provided. Please supply a date string.');
  }

  // Check if birthDate is a valid date
  const parsedBirthDate = new Date(birthDate);
  if (isNaN(parsedBirthDate.getTime())) {
    throw new Error(
      'Error: Invalid date format. Please use the ISO format YYYY-MM-DD.'
    );
  }

  // Compute age
  const now = new Date().getTime();
  return Math.floor((now - new Date(birthDate).getTime()) / 3.15576e10);
}
