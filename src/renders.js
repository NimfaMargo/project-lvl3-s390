
const renderArticlesList = (objOfItems) => {
  const items = Object.values(objOfItems);
  const list = document.getElementById('articles');
  list.innerHTML = '';
  items.forEach((item) => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = item.querySelector('link');
    anchor.innerText = item.querySelector('title').textContent;
    listItem.append(anchor);
    list.append(listItem);
  });
};
const renderChanelList = (title, description) => {
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
