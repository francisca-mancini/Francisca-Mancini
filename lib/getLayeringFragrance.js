import find from 'lodash/find';

export default function getLayeringFragrance(products, product) {
  const productTag = product.tags[0];

  const fragranceProduct = find(products, function(o) {
    return o.node.handle === productTag;
  });

  return fragranceProduct ? fragranceProduct : null;
}
