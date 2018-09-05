import find from 'lodash/find';

export default function getProductLayering(products, product) {
  const productHandle = product.handle;

  const layeringProduct = find(products, function(o) {
    return (
      o.node.productType === 'layering' && o.node.tags[0] === productHandle
    );
  });

  return layeringProduct ? layeringProduct : null;
}
