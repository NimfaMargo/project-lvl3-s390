const parseRss = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml');

  const feedtTitle = parsedData.querySelector('title').textContent;
  const feedDescription = parsedData.querySelector('description').textContent;
  const feed = { title: feedtTitle, description: feedDescription };

  let articles = [];
  const items = parsedData.querySelectorAll('item');
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
