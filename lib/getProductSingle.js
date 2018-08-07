export default function getProductSingle(product) {
  const desc = product.descriptionHtml;
  const imageRegex = /src="(.*?)"/g;
  const regex = [/\[single](.*?)\[\/single]/g];
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
