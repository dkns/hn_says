import {
  convertToHumanDate,
  paddedDate,
  paddedMonth,
  stripLeadingSlash,
} from './helpers';

describe('helpers.ts', () => {
  describe('stripLeadingSlash', () => {
    it('removes first slash from string', () => {
      const repoPathnameToStrip = '/test/example';
      expect(stripLeadingSlash(repoPathnameToStrip)).toBe('test/example');
    });

    it("doesn't do anything if first character isn't slash", () => {
      const nonRepoPathnameToStrip = 'anotherTest?=query';
      expect(stripLeadingSlash(nonRepoPathnameToStrip)).toBe(
        'anotherTest?=query',
      );
    });
  });

  describe('convertToHumanDate', () => {
    it('converts unix timestamp to human readable format', () => {
      const unixTimestamp = 1558987459;
      expect(convertToHumanDate(unixTimestamp)).toEqual('2019-05-27');
    });
  });

  describe('paddedMonth', () => {
    it('pads month', () => {
      const date = new Date('2019-5-27');
      expect(paddedMonth(date)).toEqual('05');
    });
  });

  describe('paddedDate', () => {
    it('pads date', () => {
      const date = new Date('2019-05-7');
      expect(paddedDate(date)).toEqual('07');
    });
  });
});
