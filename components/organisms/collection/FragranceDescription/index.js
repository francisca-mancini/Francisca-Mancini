import Paragraph from '../../../atoms/Paragraph';
import WordHover from '../../../molecules/WordHover';

import getFontSize from '../../../../lib/getFontSize';

export default function FragranceDescription({ description }) {
  const hoverRegex = /\[hover](.*?)\[\/hover]/g;
  const imageRegex = /src="(.*?)"/g;
  const descriptionArray = description.split(hoverRegex);
  const imagesArray = description.descriptionHtml.split(imageRegex);
  const images = [];
  const mappedDescription = [];
  let mapCount = 0;

  imagesArray.forEach(item => {
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

  descriptionArray.forEach((item, index) => {
    const isOdd = index % 2 === 1;
    mappedDescription.push({
      string: item,
      image: isOdd ? images[mapCount] : null
    });

    mapCount += isOdd ? 1 : 0;
  });

  return (
    <Paragraph indent justified size={getFontSize('xl')} font="jenson">
      {mappedDescription.map(item => {
        if (item.image) {
          return <WordHover image={item.image}>{item.string}</WordHover>;
        } else {
          return item.string;
        }
      })}
    </Paragraph>
  );
}