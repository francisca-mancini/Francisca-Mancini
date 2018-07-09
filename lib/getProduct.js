import find from 'lodash/find';

export default function getProduct(data, handle) {
  const products = data.shop.products.edges;
  const product = find(products, function(o) {
    return o.node.handle === handle;
  });

  if (product) {
    return product.node;
  }

  return null;
}
