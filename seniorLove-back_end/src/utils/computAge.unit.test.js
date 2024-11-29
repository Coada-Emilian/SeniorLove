// Unit test for the computeAge function

import computeAge from './computeAge.js';

import { describe, test, expect } from '@jest/globals';

describe('Test computeAge', () => {
  test('No argument passed', () => {
    expect(computeAge).toThrow(
      'Error: No input provided. Please supply a date string.'
    );
  });

  test('Argument passed is not a string', () => {
    expect(() => {
      computeAge(1950);
    }).toThrow('Error: Invalid input. Expected a date string.');
  });

  test('Should throw an error if argument passed is not a valid date', () => {
    expect(() => computeAge('24-12-03')).toThrow(
      'Error: Invalid date format. Please use the ISO format YYYY-MM-DD.'
    );
  });

  test('ISO format YYYY-MM-DD 74y.o', () => {
    expect(computeAge('1950-06-15')).toBe(74);
  });

  test('ISO format YYYY-MM-DD 24y.o', () => {
    expect(computeAge('2000-09-16')).toBe(24);
  });

  test('Year only', () => {
    expect(computeAge('1950')).toBe(74);
  });

  test('End of year birthday ISO format YYYY-MM-DD', () => {
    expect(computeAge('1950-12-31')).toBe(73);
  });
});
