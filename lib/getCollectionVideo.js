export default function getCollectionVideo(collection) {
  const desc = collection.description;
  const regex = /\[video](.*?)\[\/video]/g;
  const cleanDesc = desc.match(regex);
  const removeFirstTag = cleanDesc[0].replace('[video]', '');
  const removeSecondTag = removeFirstTag.replace('[/video]', '');
  const url = removeSecondTag;
  const image = collection.image.transformedSrc;

  return {
    url,
    image
  };
}
