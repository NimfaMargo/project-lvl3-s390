import { watch } from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import $ from 'jquery';
import { getFeed, findByUrl } from './rss';
import { renderArticlesList, renderChanelList, renderModal } from './renders';

export default () => {
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
    },
    feedList: new Set(),
    feed: {},
  };

  const inputForm = $('input.form-control');
  const button = $('button.btn-outline-success');
  const createDescriptionEvent = () => {
    const articleButton = $('button.btn-article');
    articleButton.on('click', (e) => {
      const url = $(e.currentTarget).attr('data-url');
      const item = findByUrl(state, url);
      renderModal(item);
    });
  };

  button.on('click', () => {
    const link = $('#searchInput').val();
    $('#searchInput').val('');
    state.feedList.add(link);
    getFeed(link)
      .then((parsedXML) => {
        state.feed = parsedXML;
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

  watch(state, 'feed', () => {
    renderChanelList(state.feed);
    renderArticlesList(state.feed);
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
