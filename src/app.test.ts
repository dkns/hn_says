import { formatStoryTitle } from './app';

describe('app.ts', () => {
  describe('formatStoryTitle', () => {
    let date;
    let points;
    let numComments
    beforeEach(() => {
      date = '2019-01-01';
      points = 55;
      numComments = 123;
    });
    it('formats title correctly', () => {
      expect(formatStoryTitle(points, numComments, date)).toEqual(
        '2019-01-01 Points: 55 Comments: 123',
      );
    });
  });
});
