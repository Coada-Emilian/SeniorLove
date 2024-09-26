/**
 * Returns date in french, with day month and year
 * @param {string} date // string date ISO YYYY-MM-DD or YYYY/MM/DD
 * @returns {string} // 3 décembre 2024
 */

export function displayFullDate(date: string) {
  if (!date || typeof date !== 'string') {
    throw new Error('You must provide a string !');
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const jsDate = new Date(date);

  if (Number.isNaN(jsDate.getTime())) {
    throw new Error('You must provide a valid ISO date format YYYY-MM-DD');
  }

  return jsDate.toLocaleDateString('fr-FR', options as object);
}

/**
 * Returns date in french, with day month and year
 * @param {string} time // string time HH:MM:SS
 * @returns {string} // formatted time 17h30
 */
export function formatTime(time: string) {
  const validateTime = /^(\d{1,2}:\d{2}:\d{2})$/;
  if (!validateTime.test(time)) {
    throw new Error('You must provide a string with format HH:MM:SS !');
  }
  const twoFirstDigits = Number(time.replace(/(\d{1,2}):\d{2}:\d{2}/, '$1'));
  if (twoFirstDigits < 10) {
    return time.replace(/\d*(\d):(\d{2}):\d{2}/, '$1h$2');
  }

  return time.replace(/(\d{1,2}):(\d{2}):\d{2}/, '$1h$2');
}

/**
 * Returns an object with abbreviated month in french and day
 * @param {string} date // string date YYYY-MM-DD
 * @returns {object} // an object {day: number, month: string}
 */

export function extractDayMonth(date: string) {
  if (!date || typeof date !== 'string') {
    throw new Error('You must provide a string !');
  }

  const jsDate = new Date(date);
  if (Number.isNaN(jsDate.getTime())) {
    throw new Error('You must provide a valid ISO date format YYYY-MM-DD');
  }
  const options = {
    month: 'short',
  };
  const shortMonth = jsDate
    .toLocaleDateString('fr-FR', options as object)
    .split('.')[0]
    .toUpperCase();
  const day = jsDate.getDate();
  return { day, month: shortMonth };
}

formatTime('17:30:00');
