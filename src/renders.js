import $ from 'jquery';
import 'bootstrap/js/dist/modal';

const renderArticlesList = (articles) => {
  $('#articles').html('');
  articles.forEach((article) => {
    const { link, title } = article;
    const listItem = $('<li></li>').html(
      `<a href="${link}">${title}</a>
      <button class="btn btn-primary btn-xs btn-article" type="button" data-toggle="modal" data-url="${link}">
        View Description
      </button>`,
    );
    $('#articles').append(listItem);
  });
};

const renderChanelList = (feed) => {
  const { title, description } = feed;
  const listItem = $('<li></li>').html(`<dt>${title}</dе><dd>${description}</dd>`);
  $('#channels').html('').append(listItem);
};

const renderModal = (description) => {
  $('.modal-body p').html(description);
  $('#myModal').modal();
};

export { renderArticlesList, renderChanelList, renderModal };
