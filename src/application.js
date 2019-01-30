import { watch } from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
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
    },
    feed: [],
    articles: '',
    feedList: new Set(),
    errorMessage: '',
  };

  const inputForm = document.querySelector('input.form-control');
  const button = document.querySelector('button.btn-outline-success');

  button.addEventListener('click', () => {
    const link = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = '';
    state.feedList.add(link);

    axios.get(`https://cors-anywhere.herokuapp.com/${link}`, { crossdomain: true })
      .then((response) => {
        const { feed, articles } = parseRss(response.data);
        state.feed = state.feed.concat(feed);
        state.articles = articles;
      })
      .catch((err) => {
        state.errorMessage = '';
        if (err.response) {
          const errStatus = err.response.status;
          switch (errStatus) {
            case 404:
              state.errorMessage = '404 Page Not Found';
              break;
            case 500:
              state.errorMessage = '500 Internal Server Error';
              break;
            case 502:
              state.errorMessage = '502 Bad Gateway Error';
              break;
            case 422:
              state.errorMessage = '422 Unprocessable Entity Error';
              break;
            default:
              state.errorMessage = 'Unknown err status';
          }
        } else if (state.feed.length === 0) {
          state.errorMessage = 'Can\'t find any RSS feed';
        } else {
          state.errorMessage = err.message;
        }
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
    renderChanelList(state.feed); // [feed1, feed2]
  });

  watch(state, 'articles', () => {
    renderArticlesList(state.articles);
    createDescriptionEvent();
  });

  watch(state, 'validationProcess', () => {
    button.disabled = state.validationProcess.submitDisabled;
    if (state.validationProcess.valid) {
      inputForm.style.border = null;
      inputForm.classList.remove('is-invalid');
    } else {
      inputForm.style.border = 'thick solid red';
      inputForm.classList.add('is-invalid');
    }
  });

  const validateHandle = ({ target }) => {
    if (target.value === '') {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = true;
    } else if (!isURL(target.value) || state.feedList.has(target.value)) {
      state.validationProcess.valid = false;
      state.validationProcess.submitDisabled = true;
    } else {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = false;
    }
  };
  inputForm.addEventListener('keyup', validateHandle);
};
export default run;
