import getProductType from './getProductType';
import getProductsByType from './getProductsByType';
import getCollectionHandle from './getCollectionHandle';
import getCollection from './getCollection';
import getProductLayering from './getProductLayering';
import getLayeringFragrance from './getLayeringFragrance';

export default function getProductRelated(product, products, data) {
  const relatedProducts = [];
  const type = getProductType(product);

  const collectionHandle = product.collections.edges.length
    ? getCollectionHandle(product.collections.edges[0].node)
    : null;
  const collection = collectionHandle
    ? getCollection(data, collectionHandle)
    : null;

  const layerings = getProductsByType(products, 'layering');
  const discoveries = getProductsByType(collection.products.edges, 'discovery');
  const discovery = discoveries.length ? discoveries[0] : null;
  const fragrances = getProductsByType(products, 'fragrance');

  switch (type) {
    case 'fragrance':
      const layering = getProductLayering(products, product);
      const randomFragrance =
        fragrances[Math.floor(Math.random() * fragrances.length)];

      randomFragrance && relatedProducts.push(randomFragrance);
      layering && relatedProducts.push(layering);
      discovery && relatedProducts.push(discovery);
      break;
    case 'layering':
      const randomLayering =
        layerings[Math.floor(Math.random() * layerings.length)];
      const fragrance = getLayeringFragrance(products, product);

      randomLayering && relatedProducts.push(randomLayering);
      fragrance && relatedProducts.push(fragrance);
      discovery && relatedProducts.push(discovery);
      break;
    case 'discovery':
      const random1 = fragrances[Math.floor(Math.random() * fragrances.length)];
      const random2 = layerings[Math.floor(Math.random() * layerings.length)];
      const random3 =
        discoveries[Math.floor(Math.random() * discoveries.length)];

      relatedProducts.push(random1, random2, random3);
      break;
    default:
      return null;
  }

  return relatedProducts;
}
