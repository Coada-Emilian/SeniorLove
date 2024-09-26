/**
 * Compute age, returns age
 * @param {string} birthDate // string date YYYY-MM-DD
 */

export default function computeAge(birthDate: string) {
  if (!birthDate || typeof birthDate !== 'string') {
    throw new Error('You must provide a string !');
  }

  const parsedBirthDate = new Date(birthDate);
  if (Number.isNaN(parsedBirthDate.getTime())) {
    throw new Error('You must provide a valid ISO date format YYYY-MM-DD');
  }

  const now = new Date().getTime();
  return Math.floor((now - new Date(birthDate).getTime()) / 3.15576e10);
}
