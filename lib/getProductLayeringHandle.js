import find from 'lodash/find';

export default function getProductLayeringHandle(products, product) {
  const productHandle = product.handle;

  const layeringProduct = find(products.edges, function(o) {
    return (
      o.node.productType === 'layering' && o.node.tags[0] === productHandle
    );
  });

  return layeringProduct ? layeringProduct.node.handle : null;
}
