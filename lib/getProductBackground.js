export default function getProductBackground(product) {
  const desc = product.description;
  const regex = /\[background](.*?)\[\/background]/g;
  const cleanDesc = desc.match(regex);
  const removeFirstTag = cleanDesc[0].replace('[background]', '');
  const removeSecondTag = removeFirstTag.replace('[/background]', '');
  const background = removeSecondTag;

  return background;
}
