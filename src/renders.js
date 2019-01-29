import $ from 'jquery';

const renderArticlesList = (parsedXML) => {
  const items = Object.values(parsedXML.querySelectorAll('item'));
  $('#articles').html('');
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const listItem = $('<li></li>').html(
      `<a href="${link}">${title}</a>
      <button class="btn btn-primary btn-xs" type="button" data-toggle="modal" data-description="${description}" data-target="#myModal">
        View Description
      </button>`,
    );
    $('[data-toggle=modal]').on('click', (e) => {
      const text = $(e.currentTarget).attr('data-description');
      $('.modal-body p').html(text);
      $('#myModal').show();
    });
    $('[data-dismiss=modal]').on('click', () => {
      $('#myModal').hide();
    });
    $('#articles').append(listItem);
  });
};
const renderChanelList = (parsedXML) => {
  const title = parsedXML.querySelector('title').textContent;
  const description = parsedXML.querySelector('description').textContent;
  const listItem = $('<li></li>').html(`<dt>${title}</dе><dd>${description}</dd>`);
  $('#channels').html('').append(listItem);
};

export { renderArticlesList, renderChanelList };
