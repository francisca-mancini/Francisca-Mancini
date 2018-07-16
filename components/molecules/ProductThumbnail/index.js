import classNames from 'classnames';
import PropTypes from 'prop-types';

import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';

import ProductShape from '../../atoms/ProductShape';

import productImage from '../../../static/images/_temp/voiledenuit.png';
import discoveryImage from '../../../static/images/_temp/discovery2.png';

import generalStyles from './general.module.css';

export default function ProductThumbnail({
  image,
  title,
  color1,
  color2,
  href,
  isDiscovery,
  isLayering
}) {
  const img = image || productImage;
  const containerClassName = classNames(
    generalStyles.imageContainer,
    'pixiContainer',
    {
      [generalStyles.imageContainerDiscovery]: isDiscovery
    }
  );
  const imageClassName = classNames(generalStyles.image, {
    [generalStyles.imageDiscovery]: isDiscovery,
    [generalStyles.imageLayering]: isLayering,
    [generalStyles.imageFragrance]: !isLayering && !isDiscovery
  });

  return (
    <div className="w-full px-20 flex items-center justify-center">
      <Link className="w-full" tag="div" href={href}>
        <div className={containerClassName}>
          <img
            className={imageClassName}
            src={isDiscovery ? discoveryImage : img}
            alt="yo"
          />
          <ProductShape
            isDiscovery={isDiscovery}
            color1={color1}
            color2={color2}
          />
        </div>
        <div>
          <Spacing size={15}>
            <Heading uppercase size="xxxxs" center font="serif" tracking="wide">
              {title || 'Title'}
            </Heading>
          </Spacing>
          <Paragraph weight="semilight" size="xs" center>
            Fragrance bottle, 100ml - £500
          </Paragraph>
        </div>
      </Link>
    </div>
  );
}

ProductThumbnail.propTypes = {
  color1: PropTypes.array.isRequired,
  color2: PropTypes.array.isRequired,
  image: PropTypes.string
};

ProductThumbnail.defaultProps = {
  color1: '#6b2854',
  color2: '#80aee8',
  image: productImage
};
