import { stripLeadingSlash } from './helpers';

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
});
