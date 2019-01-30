import $ from 'jquery';
import 'bootstrap/js/dist/modal';

const renderArticlesList = (parsedXML) => {
  const items = Object.values(parsedXML.querySelectorAll('item'));
  $('#articles').html('');
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const listItem = $('<li></li>').html(
      `<a href="${link}">${title}</a>
      <button class="btn btn-primary btn-xs btn-article" type="button" data-toggle="modal" data-url="${link}">
        View Description
      </button>`,
    );
    $('#articles').append(listItem);
  });
};
const renderChanelList = (parsedXML) => {
  const title = parsedXML.querySelector('title').textContent;
  const description = parsedXML.querySelector('description').textContent;
  const listItem = $('<li></li>').html(`<dt>${title}</dе><dd>${description}</dd>`);
  $('#channels').html('').append(listItem);
};

const renderModal = (item) => {
  const description = item.querySelector('description').textContent;
  $('.modal-body p').html(description);
  $('#myModal').modal();
};

export { renderArticlesList, renderChanelList, renderModal };
