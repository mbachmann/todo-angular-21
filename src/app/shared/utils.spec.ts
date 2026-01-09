import { getUUID, parseIsoDateStrToDate } from './utils';

describe('Utils functions', function () {
  /**
   * Here’s a unit test suite for the parseIsoDateStrToDate function.
   * It tests various scenarios, including valid ISO date strings
   * (with and without milliseconds, with timezone offsets),
   * invalid inputs, and edge cases.
   */
  describe('parseIsoDateStrToDate', () => {
    it('should return a Date object when given a valid ISO date string with milliseconds', () => {
      const isoDateString = '2023-12-01T10:15:30.123Z';
      const result = parseIsoDateStrToDate(isoDateString);
      expect(result instanceof Date).toBeTrue();
      expect(result.toISOString()).toBe(isoDateString);
    });

    it('should return a Date object when given a valid ISO date string without milliseconds', () => {
      const isoDateString = '2023-12-01T10:15:30Z';
      const result = parseIsoDateStrToDate(isoDateString);
      expect(result instanceof Date).toBeTrue();
      expect(result.toISOString()).toBe('2023-12-01T10:15:30.000Z');
    });

    it('should return a Date object when given a valid ISO date string with timezone offset', () => {
      const isoDateString = '2023-12-01T10:15:30+02:00';
      const result = parseIsoDateStrToDate(isoDateString);
      expect(result instanceof Date).toBeTrue();
      expect(result.toISOString()).toBe('2023-12-01T08:15:30.000Z');
    });

    it('should return the original value when given a non-string input', () => {
      const nonStringInput = 12345;
      const result = parseIsoDateStrToDate(nonStringInput);
      expect(result).toBe(nonStringInput);
    });

    it('should return the original value when given an invalid ISO date string', () => {
      const invalidIsoDateString = 'invalid-date';
      const result = parseIsoDateStrToDate(invalidIsoDateString);
      expect(result).toBe(invalidIsoDateString);
    });

    it('should return the original value when given an empty string', () => {
      const emptyString = '';
      const result = parseIsoDateStrToDate(emptyString);
      expect(result).toBe(emptyString);
    });

    it('should handle edge cases for valid ISO formats', () => {
      const isoDateString = '2023-12-31T23:59:59Z';
      const result = parseIsoDateStrToDate(isoDateString);
      expect(result instanceof Date).toBeTrue();
      expect(result.toISOString()).toBe('2023-12-31T23:59:59.000Z');
    });
  });

  describe('getUUID', () => {
    it('returns a string', () => {
      const uuid = getUUID();
      expect(typeof uuid).toBe('string');
    });

    it('returns a valid UUID format', () => {
      const uuid = getUUID();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidRegex.test(uuid)).toBe(true);
    });

    it('generates unique UUIDs', () => {
      const uuids = new Set();
      for (let i = 0; i < 1000; i++) {
        uuids.add(getUUID());
      }
      expect(uuids.size).toBe(1000);
    });
  });
});
