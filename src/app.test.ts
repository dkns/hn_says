import {
  createExpandButton,
  createStoriesList,
  createStoriesListElement,
  createStoryInfo,
  createStoryLink,
  formatStoryTitle,
} from './app';

describe('app.ts', () => {
  let testStory;
  let anotherTestStory;
  let testStories;

  beforeEach(() => {
    testStory = {
      created_at_i: 1558987459,
      num_comments: 5,
      objectID: 5,
      points: 42,
      title: 'some title',
    };

    anotherTestStory = {
      created_at_i: 1558987459,
      num_comments: 55,
      objectID: 45,
      points: 4244,
      title: 'some super looooooooooooooooooooooooooooong title',
    };

    testStories = [testStory, anotherTestStory];
  });

  describe('formatStoryTitle', () => {
    it('formats title correctly', () => {
      const { points, num_comments: numComments } = testStory;
      const date = '2019-01-01';
      expect(formatStoryTitle(points, numComments, date)).toEqual(
        '2019-01-01 Points: 42 Comments: 5',
      );
    });
  });

  describe('createStoryInfo', () => {
    it('creates formated html element', () => {
      const testElement = document.createElement('div');
      testElement.className = 'what-hn-says-story-info';
      testElement.innerHTML = '2019-05-27 Points: 42 Comments: 5';
      expect(createStoryInfo(testStory)).toEqual(testElement);
    });
  });

  describe('createExpandButton', () => {
    it('creates html button', () => {
      const testButton = document.createElement('button');
      testButton.className = 'btn btn-sm BtnGroup-item';
      testButton.innerText = 'What HN says';
      expect(createExpandButton()).toEqual(testButton);
    });
  });

  describe('createStoryLink', () => {
    it('creates html a element', () => {
      const testUrl = document.createElement('a');
      testUrl.href = 'https://news.ycombinator.com/item?id=5';
      testUrl.innerHTML = 'some title';
      expect(createStoryLink(testStory)).toEqual(testUrl);
    });
  });

  describe('createStoriesListElement', () => {
    it('creates single story element', () => {
      expect(createStoriesListElement(testStory)).toBeInstanceOf(Node);
    });
  });

  describe('createStoriesList', () => {
    it('creates fully populated ul element', () => {
      expect(createStoriesList(testStories)).toBeInstanceOf(Node);
    });
  });
});
