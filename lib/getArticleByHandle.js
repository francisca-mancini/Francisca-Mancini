import find from 'lodash/find';

export default function getArticleByHandle(articles, handle) {
  const article = find(articles, o => {
    return o.node.handle === handle;
  });

  return article;
}
