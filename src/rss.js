const parseRss = (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response, 'application/xml');
  const feed = {
    title: data.querySelector('title').textContent,
    description: data.querySelector('description').textContent,
  };

  const articles = [];
  const items = data.querySelectorAll('item');
  items.forEach((item) => {
    articles.push({
      link: item.querySelector('link').textContent,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
    });
  });
  return { feed, articles };
};

export default parseRss;
