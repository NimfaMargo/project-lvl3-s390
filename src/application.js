import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import axios from 'axios';
import { renderArticlesList, renderChanelList } from './renders';

export default () => {
  const parser = new DOMParser();
  const { watch } = WatchJS;
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
    },
    urllist: [],
  };

  const button = document.querySelector('button.btn-outline-success');
  const inputForm = document.querySelector('input.form-control');

  watch(state, 'validationProcess', () => {
    button.disabled = state.validationProcess.submitDisabled;
    if (state.validationProcess.valid) {
      inputForm.style.border = null;
    } else {
      inputForm.style.border = 'thick solid red';
    }
  });

  const validateHandle = ({ target }) => {
    if (target.value === '') {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = true;
    } else if (!isURL(target.value) || state.urllist.includes(target.value)) {
      state.validationProcess.valid = false;
      state.validationProcess.submitDisabled = true;
    } else {
      state.validationProcess.valid = true;
      state.validationProcess.submitDisabled = false;
    }
  };

  const addFeedHandler = () => {
    const link = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = '';
    state.urllist = [...state.urllist, link];
    axios.get(`https://cors-anywhere.herokuapp.com/${link}`, { crossdomain: true })
      .then(response => parser.parseFromString(response.data, 'application/xml'))
      .then((parsedXML) => {
        renderChanelList(parsedXML.querySelector('title'), parsedXML.querySelector('description'));
        renderArticlesList(parsedXML.querySelectorAll('item'));
      })
      .catch(console.log);
  };
  inputForm.addEventListener('keyup', validateHandle);
  button.addEventListener('click', addFeedHandler);
};
