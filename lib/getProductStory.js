export default function getProductStory(product) {
  const desc = product.description;
  const regex = /\[story](.*?)\[\/story]/g;
  const cleanDesc = desc.match(regex);
  const removeFirstTag = cleanDesc[0].replace('[story]', '');
  const removeSecondTag = removeFirstTag.replace('[/story]', '');
  const story = removeSecondTag;

  return story;
}
