import filter from 'lodash/filter';

export default function getProductsByType(products, type) {
  const filteredProducts = filter(products, o => {
    return o.node.productType === type;
  });

  return filteredProducts;
}
