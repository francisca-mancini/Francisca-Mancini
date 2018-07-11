export default function getProductCollectionImages(product) {
  const desc = product.descriptionHtml;
  const imageRegex = /src="(.*?)"/g;
  const regex = [
    /\[collectionImage1](.*?)\[\/collectionImage1]/g,
    /\[collectionImage2](.*?)\[\/collectionImage2]/g,
    /\[collectionImage3](.*?)\[\/collectionImage3]/g
  ];
  const images = [];

  for (let i = 0; i < regex.length; i++) {
    const imageArray = desc.match(regex[i]);
    const split = imageArray[0].split(imageRegex);

    split.forEach(item => {
      if (
        item.includes('.jpg') ||
        item.includes('.jpeg') ||
        item.includes('.JPEG') ||
        item.includes('.JPG') ||
        item.includes('.png') ||
        item.includes('.PNG') ||
        item.includes('.gif') ||
        item.includes('.GIF')
      ) {
        images.push(item);
      }
    });
  }

  return images;
}
