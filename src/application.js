import { watch } from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import $ from 'jquery';
import getFeed from './model';

export default () => {
  const state = {
    validationProcess: {
      valid: true,
      submitDisabled: true,
    },
    feedList: new Set(),
  };
  const inputForm = $('input.form-control');
  const button = $('button.btn-outline-success');

  button.on('click', () => {
    const link = $('#searchInput').val();
    $('#searchInput').val('');
    state.feedList.add(link);
    getFeed(link);
  });


  watch(state, 'validationProcess', () => {
    button.disabled = state.validationProcess.submitDisabled;
    if (state.validationProcess.valid) {
      inputForm.removeClass('is-invalid');
    } else {
      inputForm.addClass('is-invalid');
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
  inputForm.on('keyup', validateHandle);
};
