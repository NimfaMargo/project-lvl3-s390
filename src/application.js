import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import getFeed from './model';

export default () => {
  const { watch } = WatchJS;
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
    },
    feedList: new Set(),
  };

  const button = document.querySelector('button.btn-outline-success');

  const addFeedHandler = () => {
    const link = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = '';
    state.feedList.add(link);
    getFeed(link);
  };
  button.addEventListener('click', addFeedHandler);

  const inputForm = document.querySelector('input.form-control');

  watch(state, 'validationProcess', () => {
    button.disabled = state.validationProcess.submitDisabled;
    if (state.validationProcess.valid) {
      inputForm.classList.remove('is-invalid');
    } else {
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
