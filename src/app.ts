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

function createExpandButton(): HTMLElement {
  const button = document.createElement('button');
  button.className = 'btn btn-sm BtnGroup-item';
  button.innerText = 'What HN says';

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

function createStoryInfo(story: IStory): Node {
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

function createStoryLink(story: IStory): Node {
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
  list.className = 'what-hn-says-closed';

  for (const story of stories) {
    list.append(createStoriesListElement(story));
  }

  document.addEventListener('expandButtonToggle', () => {
    if (list.className === 'what-hn-says') {
      list.className = 'what-hn-says-closed';
    } else {
      list.className = 'what-hn-says';
    }
  });

  return list;
}

async function main(): Promise<void> {
  const topicToSearch: string = stripLeadingSlash(repositoryUrl);
  const stories: IStory[] = await searchForStories(topicToSearch);

  const storiesList: HTMLElement = createStoriesList(stories);
  const expandButton = createExpandButton();

  appendToPageAfterElement(
    'file-navigation in-mid-page d-flex flex-items-start',
    storiesList,
  );
  appendToPage('.BtnGroup', expandButton);
}

main();

export { formatStoryTitle };
