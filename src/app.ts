import axios from 'axios';

const repositoryUrl: string = window.location.pathname;
const hnSearchUrl: string = 'https://hn.algolia.com/api/v1/search_by_date';

function stripLeadingSlash(pathname: string): string {
  return pathname.replace(/^\/+/g, '');
}

function searchForRepo(): void {
  const topicToSearch: string = stripLeadingSlash(repositoryUrl);

  axios
    .get(`${hnSearchUrl}?query="${topicToSearch}"&tags=(story,show_hn)`)
    .then((response) => {
      return response;
    });
}

searchForRepo();
