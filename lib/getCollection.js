import find from 'lodash/find';

export default function getCollection(data, handle) {
  if (!data.shop) return;
  const collections = data.shop.collections.edges;
  const collection = find(collections, function(o) {
    return o.node.handle === handle;
  });

  if (collection) {
    return collection.node;
  }

  return null;
}
