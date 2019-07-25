import {
  appendToPage,
  appendToPageAfterElement,
  convertToHumanDate,
  stripLeadingSlash,
} from './helpers';

const repositoryUrl: string = window.location.pathname;
const HN_SEARCH_URL: string = 'https://hn.algolia.com/api/v1/search_by_date';
const HN_STORY_URL: string = 'https://news.ycombinator.com/item?id=';

async function searchForStories(searchQuery: string): Promise<IStory[]> {
  const resp = await fetch(
    `${HN_SEARCH_URL}?query="${searchQuery}"&tags=(story,show_hn)`,
  );
  const json = await resp.json();

  return json.hits;
}

export function createExpandButton(): HTMLElement {
  const button = document.createElement('button');
  button.className = 'btn btn-sm BtnGroup-item';
  button.id = 'hn-says-btn';
  button.innerText = 'What HN says?';

  button.addEventListener('click', () => {
    const event = new CustomEvent('expandButtonToggle', { bubbles: true });
    button.dispatchEvent(event);
  });

  return button;
}

interface IStory {
  author?: string;
  comment_text?: string;
  created_at?: string;
  created_at_i: number;
  num_comments: number;
  objectID: number;
  parent_id?: number;
  points: number;
  relevancy_score?: number;
  story_id?: number;
  story_text?: string;
  story_title?: string;
  story_url?: string;
  title: string;
  url?: string;
  _highlightResult?: object;
  _tags?: string[];
}

export function createStoryInfo(story: IStory): Node {
  const {
    created_at_i: unixTimestamp,
    num_comments: numComments,
    points,
  } = story;
  const date = convertToHumanDate(unixTimestamp);
  const storyInfo = document.createElement('div');
  storyInfo.className = 'what-hn-says-story-info';
  storyInfo.innerHTML = formatStoryTitle(points, numComments, date);

  return storyInfo;
}

export function createStoryLink(story: IStory): Node {
  const { objectID, title } = story;
  const storyUrl = HN_STORY_URL + objectID.toString();
  const storyLink = document.createElement('a');

  storyLink.href = storyUrl;
  storyLink.innerHTML = title;

  return storyLink;
}

export function formatStoryTitle(
  points: number,
  numComments: number,
  date: string,
): string {
  return `${date} Points: ${points} Comments: ${numComments.toString()}`;
}

export function createStoriesListElement(story: IStory): Node {
  const listElement = document.createElement('li');
  listElement.appendChild(createStoryInfo(story));
  listElement.appendChild(createStoryLink(story));
  return listElement;
}

export function createStoriesList(stories: IStory[]): HTMLElement {
  const list = document.createElement('ul');
  list.className = 'what-hn-says-list';

  for (const story of stories) {
    list.append(createStoriesListElement(story));
  }

  return list;
}

export function createHoldingContainer(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'what-hn-says-closed';
  container.id = 'hn-says-container';

  document.addEventListener('expandButtonToggle', () => {
    if (container.className === 'what-hn-says') {
      container.className = 'what-hn-says-closed';
    } else {
      container.className = 'what-hn-says';
    }
  });

  return container;
}

export function createEmptyListMessage(): HTMLElement {
  const empty = document.createElement('a');
  empty.className = 'what-hn-says-empty-list';
  empty.href = `http://news.ycombinator.com/submitlink?u=${encodeURIComponent(
    document.location.toString(),
  )}&t=${encodeURIComponent(document.title)}`;
  empty.innerHTML = 'Nothing here yet! Consider submitting?';

  return empty;
}

async function main(): Promise<void> {
  const topicToSearch: string = stripLeadingSlash(repositoryUrl);
  const stories: IStory[] = await searchForStories(topicToSearch);

  const expandButton = createExpandButton();
  appendToPage('.BtnGroup', expandButton);

  appendToPageAfterElement(
    'file-navigation in-mid-page d-flex flex-items-start',
    createHoldingContainer(),
  );

  if (stories.length > 0) {
    const storiesList: HTMLElement = createStoriesList(stories);
    document.getElementById('hn-says-container')!.appendChild(storiesList);
  } else {
    document
      .getElementById('hn-says-container')!
      .appendChild(createEmptyListMessage());
  }
}

main();
