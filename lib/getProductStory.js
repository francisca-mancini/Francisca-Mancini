export default function getProductStory(product) {
  const desc = product.description;
  const descHtml = product.descriptionHtml;
  const regex = /\[story](.*?)\[\/story]/g;
  const cleanDesc = desc.match(regex);
  const removeFirstTag = cleanDesc[0].replace('[story]', '');
  const removeSecondTag = removeFirstTag.replace('[/story]', '');
  const story = removeSecondTag;

  console.log(product);

  return {
    description: story,
    descriptionHtml: descHtml
  };
}
