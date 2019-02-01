import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/alert';

const renderArticlesList = (articles) => {
  const list = document.getElementById('articles');
  list.innerHTML = '';
  articles.forEach((article) => {
    const { link, title } = article;
    const listItem = document.createElement('li');
    listItem.innerHTML = (`<a href="${link}">${title}</a>
      <button class="btn btn-primary btn-xs btn-article" type="button" data-toggle="modal" data-url="${link}">
        View Description
      </button>`);
    list.append(listItem);
  });
};

const renderChanelList = (feeds) => {
  const list = document.getElementById('channels');
  list.innerHTML = '';
  feeds.forEach((feed) => {
    const { title, description } = feed;
    const listItem = document.createElement('li');
    listItem.innerHTML = (`<dt>${title}</dе><dd>${description}</dd>`);
    list.append(listItem);
  });
};

const renderModal = (description) => {
  $('.modal-body p').html(description);
  $('#myModal').modal();
};

const renderError = (message) => {
  const body = document.querySelector('body');
  const div = document.getElementById('MyAlert');
  div.innerHTML = (`<div class="alert alert-danger alert-dismissible position-absolute w-100 fade show" role="alert">
    <strong>ERROR!</strong> 
    <span>${message}</span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
  body.prepend(div);
};

export {
  renderArticlesList, renderChanelList, renderModal, renderError,
};
