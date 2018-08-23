import find from 'lodash/find';

export default function getProductsByVoile(products) {
  const voiles = [];

  products.forEach(item => {
    const voile = find(item.node.tags, o => {
      return o === 'voile';
    });
    if (voile) {
      voiles.push(item);
    }
  });

  return voiles;
}
