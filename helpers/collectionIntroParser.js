export default function collectionIntroParser(plainDescription, htmlDescription) {
  const descriptionArray = plainDescription.split(/\[hover](.*?)\[\/hover]/g);
  const imagesArray = htmlDescription.split(/src="(.*?)"/g);
  const cleanImagesArray = [];
  const mappedDescription = [];
  let mapCount = 0;

  imagesArray.forEach(item => {
    if (item.includes('cdn.shopify.com')) {
      cleanImagesArray.push(item)
    }
  });

  descriptionArray.forEach((item, index) => {
    const isOdd = index % 2 === 1;
    mappedDescription.push({
      string: item,
      image: isOdd ? cleanImagesArray[mapCount] : null
    });

    mapCount += isOdd ? 1 : 0;
  });

  console.log(descriptionArray)

  return descriptionArray;
}