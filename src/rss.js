import axios from 'axios';

const getFeed = (url) => {
  const parser = new DOMParser();
  return axios.get(`https://cors-anywhere.herokuapp.com/${url}`, { crossdomain: true })
    .then(response => parser.parseFromString(response.data, 'application/xml'))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
const findByUrl = (state, url) => {
  const items = Object.values(state.feed.querySelectorAll('item'));
  return items.find(el => el.querySelector('link').textContent === url);
};

export { getFeed, findByUrl };
