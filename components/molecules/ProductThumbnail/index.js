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

export default function ProductThumbnail({ product }) {
  console.log(product);
  const color1 = getProductGradient(product).color1;
  const color2 = getProductGradient(product).color2;
  const handle = getProductHandle(product);
  const images = getProductImages(product);
  const title = getProductTitle(product);
  const img = images[0].transformedSrc;

  return (
    <div className="w-full px-20 flex items-center justify-center">
      <Link className="w-full" tag="div" href={`/product/${handle}`}>
        <div
          className={classNames(generalStyles.imageContainer, 'pixiContainer')}
        >
          <img className={generalStyles.image} src={img} alt="yo" />
          <ProductShape color1={color1} color2={color2} />
        </div>
        <div>
          <Spacing size={15}>
            <Heading uppercase size="xxxxs" center font="serif" tracking="wide">
              {title}
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
  color2: '#80aee8'
};
