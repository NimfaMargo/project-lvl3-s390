const body = document.querySelector('body');

const renderItemsList = (objOfItems) => {
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
const renderChanelList = (title, description) => {
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

export { renderItemsList, renderChanelList };
