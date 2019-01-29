import axios from 'axios';
import { renderArticlesList, renderChanelList } from './renders';

const getFeed = (url) => {
  const parser = new DOMParser();
  axios.get(`https://cors-anywhere.herokuapp.com/${url}`, { crossdomain: true })
    .then(response => parser.parseFromString(response.data, 'application/xml'))
    .then((parsedXML) => {
      renderChanelList(parsedXML);
      renderArticlesList(parsedXML);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default getFeed;
