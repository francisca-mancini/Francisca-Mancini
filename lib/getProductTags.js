export default function getProductTags(product) {
  const rawTags = product.tags;
  const tags = [];

  // const collectionItem = rawTags.map(item => {
  //   if (item.startsWith('Collection')) {
  //     return item;
  //   }
  // });

  // tags[0] = collectionItem[0] || rawTags[0];
  // tags[1] = rawTags[1];
  // tags[2] = rawTags[2];

  console.log(tags);

  return tags;
}
