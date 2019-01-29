import $ from 'jquery';

const createButton = (description) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.innerHTML = 'View Description';
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#myModal');
  button.setAttribute('data-description', description);

  $('[data-toggle=modal]').on('click', (e) => {
    const text = $(e.currentTarget).attr('data-description');
    $('div.modal-body').html(text);
    $('#myModal').show();
  });
  $('[data-dismiss=modal]').on('click', () => {
    $('#myModal').hide();
  });
  return button;
};

const renderArticlesList = (parsedXML) => {
  const objOfItems = parsedXML.querySelectorAll('item');
  const items = Object.values(objOfItems);
  const list = document.getElementById('articles');
  list.innerHTML = '';
  items.forEach((item) => {
    const listItem = document.createElement('li');
    const description = item.querySelector('description').textContent;
    const button = createButton(description);
    const anchor = document.createElement('a');
    anchor.href = item.querySelector('link');
    anchor.innerText = item.querySelector('title').textContent;
    listItem.append(anchor, '  ', button);
    list.append(listItem);
  });
};
const renderChanelList = (parsedXML) => {
  const title = parsedXML.querySelector('title');
  const description = parsedXML.querySelector('description');
  const list = document.getElementById('channels');
  list.innerHTML = '';
  const listItem = document.createElement('li');
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.innerText = title.textContent;
  dd.innerText = description.textContent;
  listItem.append(dt, dd);
  list.append(listItem);
};

export { renderArticlesList, renderChanelList };
