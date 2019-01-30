const parseRss = (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response, 'application/xml');

  const feedtTitle = data.querySelector('title').textContent;
  const feedDescription = data.querySelector('description').textContent;
  const feed = { feedtTitle, feedDescription };

  let articles = [];
  const items = data.querySelectorAll('item');
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const article = { link, title, description };
    articles = articles.concat(article);
  });
  return { feed, articles };
};

export default parseRss;
