import getProduct from './getProduct';
import getProductType from './getProductType';

const array = ['product1', 'product2', 'product3'];

const regex = [
  /\[product1](.*?)\[\/product1]/g,
  /\[product2](.*?)\[\/product2]/g,
  /\[product3](.*?)\[\/product3]/g
];

export default function getProductsHome(articles, data) {
  let products = [];

  articles.forEach(item => {
    const desc = item.node.content;

    if (desc.includes('[featuredCollection]')) {
      array.forEach((item, index) => {
        const reg = regex[index];
        const cleanDesc = desc.match(reg);
        const removeFirstTag = cleanDesc[0].replace(`[${item}]`, '');
        const removeSecondTag = removeFirstTag.replace(`[/${item}]`, '');
        const handle = removeSecondTag;

        const product = getProduct(data, handle);
        const productType = getProductType(product);
        products.push({
          product: product,
          type: productType
        });
      });
    }
  });

  return products;
}
