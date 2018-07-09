export default function getProductDescription(product) {
  const desc = product.description;
  const regex = /\[description](.*?)\[\/description]/g;
  const cleanDesc = desc.match(regex);
  const removeFirstTag = cleanDesc[0].replace('[description]', '');
  const removeSecondTag = removeFirstTag.replace('[/description]', '');
  const description = removeSecondTag;

  return description;
}
