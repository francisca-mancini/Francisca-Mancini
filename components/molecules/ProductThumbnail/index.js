import classNames from 'classnames';
import PropTypes from 'prop-types';

import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';

import ProductShape from '../../atoms/ProductShape';

import getProductGradient from '../../../lib/getProductGradient';
import getProductHandle from '../../../lib/getProductHandle';
import getProductImages from '../../../lib/getProductImages';
import getProductTitle from '../../../lib/getProductTitle';

import generalStyles from './general.module.css';

export default function ProductThumbnail({
  product,
  isDiscovery,
  isLayering,
  hasNoInfo
}) {
  const color1 = getProductGradient(product)
    ? getProductGradient(product).color1
    : '#6b2854';
  const color2 = getProductGradient(product)
    ? getProductGradient(product).color2
    : '#80aee8';
  const handle = getProductHandle(product);
  const images = getProductImages(product);
  const title = getProductTitle(product);
  const img = images[0].transformedSrc;
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
      <Link className="w-full" tag="div" href={`/product/${handle}`}>
        <div className={containerClassName}>
          <img className={imageClassName} src={img} alt="" />
          <ProductShape
            isDiscovery={isDiscovery}
            color1={color1}
            color2={color2}
          />
        </div>
        {!hasNoInfo && (
          <div>
            <Spacing size={15}>
              <Heading
                uppercase
                size="xxxxs"
                center
                font="serif"
                tracking="wide"
              >
                {title}
              </Heading>
            </Spacing>
            <Paragraph weight="semilight" size="xs" center>
              Fragrance bottle, 100ml - £500
            </Paragraph>
          </div>
        )}
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
  color2: '#80aee8'
};
