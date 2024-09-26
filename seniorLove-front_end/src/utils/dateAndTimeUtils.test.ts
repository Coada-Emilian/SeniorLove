// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import {
  displayFullDate,
  formatTime,
  extractDayMonth,
} from './dateAndTimeUtils';

// Test displayFullDate function
describe('Test displayFullDate', () => {
  test('Should throw an error if no argument is passed', () => {
    expect(displayFullDate).toThrow('You must provide a string !');
  });

  test('Should throw an error if argument passed is not a string', () => {
    expect(() => {
      // @ts-expect-error Ignore type error for test purpose
      displayFullDate(2024 - 12 - 10);
    }).toThrow('You must provide a string !');
  });

  test('Should throw an error if invalid date format is passed', () => {
    expect(() => displayFullDate('24-12-03')).toThrow(
      'You must provide a valid ISO date format YYYY-MM-DD'
    );
  });

  test('Should display full date in french if ISO date format is passed', () => {
    expect(displayFullDate('2024-12-03')).toBe('3 décembre 2024');
  });
});

// Test formatTime function
describe('Test formatTime', () => {
  test('Should throw an error if no argument is passed', () => {
    expect(formatTime).toThrow(
      'You must provide a string with format HH:MM:SS !'
    );
  });

  test('Should throw an error if argument passed is not a string', () => {
    expect(() => {
      // @ts-expect-error Ignore type error for test purpose
      formatTime(173000);
    }).toThrow('You must provide a string with format HH:MM:SS !');
  });

  test('Should throw an error if argument passed is not valid time format', () => {
    expect(() => {
      formatTime('17h30');
    }).toThrow('You must provide a string with format HH:MM:SS !');
  });

  test('Should return the correct formatted time with 2 digits hour', () => {
    expect(formatTime('17:30:00')).toBe('17h30');
  });

  test('Should return 1 digit hour if arg hour starts with zero', () => {
    expect(formatTime('07:30:00')).toBe('7h30');
  });

  test('Should return 1 digit hour if arg hour is 1 digit', () => {
    expect(formatTime('7:30:00')).toBe('7h30');
  });
});

// Test extractDayMonth function
describe('Test extractDayMonthy', () => {
  test('Should throw an error if no argument is passed', () => {
    expect(extractDayMonth).toThrow('You must provide a string !');
  });

  test('Should throw an error if argument passed is not a string', () => {
    expect(() => {
      // @ts-expect-error Ignore type error for test purpose
      extractDayMonth(2024 - 9 - 10);
    }).toThrow('You must provide a string !');
  });

  test('Should throw an error if invalid date format is passed', () => {
    expect(() => extractDayMonth('24-12-03')).toThrow(
      'You must provide a valid ISO date format YYYY-MM-DD'
    );
  });

  test('Should return an object with day and uppercase short month in french from ISO Format date argument', () => {
    expect(extractDayMonth('2024-12-03')).toEqual({ day: 3, month: 'DÉC' });
    expect(extractDayMonth('2024-02-15')).toEqual({ day: 15, month: 'FÉVR' });
    expect(extractDayMonth('2024-06-21')).toEqual({ day: 21, month: 'JUIN' });
    expect(extractDayMonth('2024-07-09')).toEqual({ day: 9, month: 'JUIL' });
  });
});
