import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import axios from 'axios';

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
  const body = document.querySelector('body');
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

  const makeItemsList = (objOfItems) => {
    const items = Object.values(objOfItems);
    const list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush');
    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      const anchor = document.createElement('a');
      anchor.href = item.querySelector('link');
      anchor.innerText = item.querySelector('title').textContent;
      listItem.append(anchor);
      list.append(listItem);
    });
    body.append(list);
  };
  const makeFeedList = (title, description) => {
    const div = document.createElement('div');
    div.classList.add('container');
    const list = document.createElement('ul');
    list.classList.add('list-group');
    const listItem = document.createElement('li');
    const head = document.createElement('h3');
    const paragraph = document.createElement('p');
    head.innerText = title.textContent;
    paragraph.innerText = description.textContent;
    listItem.append(head, paragraph);
    list.append(listItem);
    div.append(list);
    body.append(div);
  };

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
        makeFeedList(parsedXML.querySelector('title'), parsedXML.querySelector('description'));
        makeItemsList(parsedXML.querySelectorAll('item'));
      })
      .catch(console.log);
  };
  inputForm.addEventListener('keyup', validateHandle);
  button.addEventListener('click', addFeedHandler);
};
