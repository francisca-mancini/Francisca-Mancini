import classNames from 'classnames';
import PropTypes from 'prop-types';

import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';

import ProductShape from '../../atoms/ProductShape';

import productImage from '../../../static/images/_temp/voiledenuit.png';

import generalStyles from './general.module.css';

export default function ProductThumbnail({ image, color1, color2 }) {
  return (
    <div className="w-full px-20 flex items-center justify-center">
      <Link className="w-full" tag="div" href="/product">
        <div
          className={classNames(generalStyles.imageContainer, 'pixiContainer')}
        >
          <img className={generalStyles.image} src={image} alt="yo" />
          <ProductShape color1={color1} color2={color2} />
        </div>
        <div>
          <Spacing size={15}>
            <Heading uppercase size="xxxxs" center font="serif" tracking="wide">
              Renaissance
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
