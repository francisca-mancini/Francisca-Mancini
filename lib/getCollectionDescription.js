export default function getCollectionDescription(collection) {
  const desc = collection.description;
  const descHtml = collection.descriptionHtml;
  const regex = /\[description](.*?)\[\/description]/g;
  const cleanDesc = desc.match(regex);
  if (!cleanDesc) return null;
  const removeFirstTag = cleanDesc[0].replace('[description]', '');
  const removeSecondTag = removeFirstTag.replace('[/description]', '');
  const description = removeSecondTag;

  return {
    description,
    descriptionHtml: descHtml
  };
}
