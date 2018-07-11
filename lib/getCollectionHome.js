import getCollection from './getCollection';

export default function getCollectionHome(articles, data) {
  let collection = null;

  articles.forEach(item => {
    const desc = item.node.content;

    if (desc.includes('[featuredCollection]')) {
      const regex = /\[featuredCollection](.*?)\[\/featuredCollection]/g;
      const cleanDesc = desc.match(regex);
      const removeFirstTag = cleanDesc[0].replace('[featuredCollection]', '');
      const removeSecondTag = removeFirstTag.replace(
        '[/featuredCollection]',
        ''
      );
      const handle = removeSecondTag;

      collection = getCollection(data, handle);
    }
  });

  return collection;
}
