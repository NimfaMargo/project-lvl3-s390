import { watch } from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import $ from 'jquery';
import axios from 'axios';
import parseRss from './rss';
import { renderArticlesList, renderChanelList, renderModal } from './renders';

const run = () => {
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
    },
    feed: '',
    articles: '',
    feedList: new Set(),
  };

  const inputForm = $('input.form-control');
  const button = $('button.btn-outline-success');

  button.on('click', () => {
    const link = $('#searchInput').val();
    $('#searchInput').val('');
    state.feedList.add(link);

    axios.get(`https://cors-anywhere.herokuapp.com/${link}`, { crossdomain: true })
      .then((response) => {
        const { feed, articles } = parseRss(response.data);
        state.feed = feed;
        state.articles = articles;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });

  watch(state, 'validationProcess', () => {
    button.prop('disabled', state.validationProcess.submitDisabled);
    if (state.validationProcess.valid) {
      inputForm.removeClass('is-invalid');
    } else {
      inputForm.addClass('is-invalid');
    }
  });

  const createDescriptionEvent = () => {
    const articleButton = $('button.btn-article');
    articleButton.on('click', (e) => {
      const url = $(e.currentTarget).attr('data-url');
      const article = state.articles.find(i => i.link === url);
      renderModal(article.description);
    });
  };

  watch(state, 'feed', () => {
    renderChanelList(state.feed);
  });

  watch(state, 'articles', () => {
    renderArticlesList(state.articles);
    createDescriptionEvent();
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
  inputForm.on('keyup', validateHandle);
};

export default run;
