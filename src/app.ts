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

function createStoryLink(story: IStory): Node {
  const {
    objectID,
    title,
    points,
    num_comments: numComments,
    created_at_i: unixTimestamp,
  } = story;
  const storyUrl = HN_STORY_URL + objectID.toString();
  const storyLink = document.createElement('a');
  const date = convertToHumanDate(unixTimestamp);

  storyLink.href = storyUrl;
  storyLink.innerText = formatStoryTitle(title, points, numComments, date);

  return storyLink;
}

function formatStoryTitle(
  title: string,
  points: number,
  numComments: number,
  date: string,
): string {
  return `${date} Points: ${points.toString()}, Comments: ${numComments.toString()} --- ${title}`;
}

function createStoriesList(stories: IStory[]): HTMLElement {
  const list = document.createElement('ul');
  list.className = 'what-hn-says';
  list.style.display = 'none';

  for (const story of stories) {
    const listElement = document.createElement('li');
    listElement.appendChild(createStoryLink(story));
    list.append(listElement);
  }

  document.addEventListener('expandButtonToggle', () => {
    if (list.style.display === 'none') {
      list.style.display = 'flex';
    } else {
      list.style.display = 'none';
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
