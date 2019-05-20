import {
  appendToPage,
  appendToPageAfterElement,
  convertToHumanDate,
  stripLeadingSlash,
} from './helpers';

const repositoryUrl: string = window.location.pathname;
const HN_SEARCH_URL: string = 'https://hn.algolia.com/api/v1/search_by_date';
const HN_STORY_URL: string = 'https://news.ycombinator.com/item?id=';

async function searchForRepo(searchQuery: string) {
  const resp = await fetch(
    `${HN_SEARCH_URL}?query="${searchQuery}"&tags=(story,show_hn)`,
  );
  const json = await resp.json();

  return json;
}

async function extractStories(data) {
  const jsonData = await searchForRepo(data);
  return jsonData.hits;
}

function createExpandButton() {
  const button = document.createElement('button');
  button.className = 'btn btn-sm BtnGroup-item';
  button.innerText = 'What HN says';

  button.addEventListener('click', () => {
    const event = new CustomEvent('expandButtonToggle', { bubbles: true });
    button.dispatchEvent(event);
  });

  return button;
}

function createStoryLink(story) {
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
  points: string,
  numComments: string,
  date: string,
): string {
  return `${date} Points: ${points}, Comments: ${numComments} --- ${title}`;
}

function createStoriesList(stories: string) {
  const list = document.createElement('ul');
  list.className = 'what-hn-says';

  for (const story of stories) {
    const listElement = document.createElement('li');
    listElement.appendChild(createStoryLink(story));
    list.append(listElement);
  }

  return list;
}

async function main(): Promise<void> {
  const topicToSearch: string = stripLeadingSlash(repositoryUrl);
  const extractedStories = await extractStories(topicToSearch);

  const storiesList = createStoriesList(extractedStories);
  const expandButton = createExpandButton();

  appendToPageAfterElement(
    'file-navigation in-mid-page d-flex flex-items-start',
    storiesList,
  );
  appendToPage('.BtnGroup', expandButton);

  document.addEventListener('expandButtonToggle', () => {
    if (storiesList.style.display === 'none') {
      storiesList.style.display = 'flex';
    } else {
      storiesList.style.display = 'none';
    }
  });
}

main();
