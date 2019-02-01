import { watch } from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import _ from 'lodash';
import axios from 'axios';
import parseRss from './parser';
import {
  renderArticlesList, renderChanelList, renderModal, renderError,
} from './renders';

const run = () => {
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
      inputDisabled: true,
    },
    newArticles: [],
    feed: [],
    articles: [],
    feedList: [],
    errorMessage: '',
  };

  const errorHandler = (err) => {
    if (err.response) {
      const errStatus = err.response.status;
      switch (errStatus) {
        case 404:
          state.errorMessage = '404 Page Not Found';
          break;
        case 500:
          state.errorMessage = '500 Internal Server';
          break;
        case 502:
          state.errorMessage = '502 Bad Gateway';
          break;
        case 422:
          state.errorMessage = '422 Unprocessable Entity';
          break;
        default:
          state.errorMessage = 'Unknown Error';
      }
    } else if (err.message === 'Network Error') {
      state.errorMessage = 'No Internet Network Error';
    } else if (state.feed.length === 0 || err.message === 'error while parsing') {
      state.errorMessage = 'Can\'t find any RSS feed';
    } else {
      state.errorMessage = err.message;
    }
  };

  const inputForm = document.querySelector('input.form-control');
  const button = document.querySelector('button.btn-outline-success');

  button.addEventListener('click', () => {
    state.validationProcess.submitDisabled = true;
    state.validationProcess.inputDisabled = true;
    const link = document.getElementById('searchInput').value;
    state.feedList = [...state.feedList, link];

    axios.get(`https://cors-anywhere.herokuapp.com/${link}`)
      .then((response) => {
        const { feed, articles } = parseRss(response.data);
        state.feed = [...state.feed, feed];
        state.articles = articles;
        document.getElementById('searchInput').value = '';
        state.validationProcess.inputDisabled = false;
      })
      .then()
      .catch((err) => {
        state.validationProcess.submitDisabled = false;
        state.validationProcess.inputDisabled = false;
        state.errorMessage = '';
        errorHandler(err);
      });
  });

  const createDescriptionEvent = () => {
    const articleButton = document.querySelectorAll('button.btn-article');
    articleButton.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.getAttribute('data-url');
        const article = state.articles.find(i => i.link === url);
        renderModal(article.description);
      });
    });
  };
  watch(state, 'errorMessage', () => {
    renderError(state.errorMessage);
  });

  watch(state, 'feed', () => {
    renderChanelList(state.feed);
  });

  watch(state, 'articles', () => {
    renderArticlesList(state.articles);
    createDescriptionEvent();
  });

  watch(state, 'validationProcess', () => {
    button.disabled = state.validationProcess.submitDisabled;
    inputForm.disabled = state.validationProcess.inputDisabled;
    if (state.validationProcess.valid) {
      inputForm.style.border = null;
      inputForm.classList.remove('is-invalid');
    } else {
      inputForm.style.border = 'thick solid red';
      inputForm.classList.add('is-invalid');
    }
  });

  const validateHandle = ({ target }) => {
    state.validationProcess.inputDisabled = false;
    if (target.value === '') {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = true;
    } else if (!isURL(target.value) || state.feedList.includes(target.value)) {
      state.validationProcess.valid = false;
      state.validationProcess.submitDisabled = true;
    } else {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = false;
    }
  };
  inputForm.addEventListener('keyup', validateHandle);

  const updateFeed = (feedUrls) => {
    const promises = feedUrls.map(url => axios.get(`https://cors-anywhere.herokuapp.com/${url}`));
    Promise.all(promises)
      .then((data) => {
        const receivedArticles = _.flatten(data.map((el) => {
          const { articles } = parseRss(el.data);
          return articles;
        }));
        const currentArticles = state.articles;
        const newArticles = _.differenceBy(receivedArticles, currentArticles, 'link');

        if (newArticles.length !== 0) {
          state.newArticles = [...state.newArticles, ...newArticles];
          state.articles = [...state.newArticles, ...state.articles];
          state.newArticles = [];
        }
      })
      .then(() => {
        setTimeout(() => updateFeed(state.feedList), 5000);
      })
      .catch(err => errorHandler(err));
  };
  updateFeed(state.feedList);
};
export default run;
