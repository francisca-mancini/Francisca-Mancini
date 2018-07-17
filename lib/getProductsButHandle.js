import filter from 'lodash/filter';

export default function getProductsButHandle(products, handle) {
  const filteredProducts = filter(products, o => {
    return o.node.handle !== handle;
  });

  return filteredProducts;
}
