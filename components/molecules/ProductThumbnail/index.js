import React, { Fragment, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';
import ProductShape from '../../atoms/ProductShape';

import FadeIn from '../FadeIn';

import getProductGradient from '../../../lib/getProductGradient';
import getProductHandle from '../../../lib/getProductHandle';
import getProductImages from '../../../lib/getProductImages';
import getProductTitle from '../../../lib/getProductTitle';
import getProductSingle from '../../../lib/getProductSingle';
import getCleanType from '../../../lib/getCleanType';
import getProductType from '../../../lib/getProductType';
import getProductPrice from '../../../lib/getProductPrice';

import generalStyles from './general.module.css';

export default class ProductThumbnail extends PureComponent {
  render() {
    const {
      product,
      dataProduct,
      voiles,
      isDiscovery,
      isLayering,
      isNoClick,
      isSingle,
      isMultiple,
      hasNoInfo,
      isNoPrice
    } = this.props;

    const color1 = isLayering
      ? getProductGradient(dataProduct).color1
      : getProductGradient(product).color1;
    const color2 = isLayering
      ? getProductGradient(dataProduct).color2
      : getProductGradient(product).color2;
    const handle = getProductHandle(product);
    const images = getProductImages(product);
    const price = getProductPrice(product);
    const singleImage =
      isSingle || isMultiple ? getProductSingle(product) : null;
    const voile1 = isMultiple ? getProductSingle(voiles[0].node)[0] : null;
    const voile2 = isMultiple ? getProductSingle(voiles[1].node)[0] : null;
    const type = getProductType(product);
    const cleanType = getCleanType(type);
    const title = getProductTitle(product);
    const img = singleImage || images[0].transformedSrc;
    const containerClassName = classNames(
      generalStyles.imageContainer,
      'pixiContainer',
      {
        [generalStyles.imageContainerDiscovery]: isDiscovery
      }
    );
    const imageClassName = classNames(generalStyles.image, {
      [generalStyles.imageDiscovery]: isDiscovery,
      [generalStyles.imageLayering]: isLayering && !isSingle && !isMultiple,
      [generalStyles.imageMultiple]: isMultiple,
      [generalStyles.imageSingle]: isSingle,
      [generalStyles.imageFragrance]: !isLayering && !isDiscovery
    });
    const imageStyles = {
      animation:
        isSingle || isMultiple
          ? `float ${(Math.random() + 0.3) * 20}s ${Math.random() +
              0.5}s infinite alternate ease-in-out`
          : ''
    };
    const multipleStyles1 = {
      transform: 'translate(-50%, -50%) rotate(-4deg)'
    };
    const multipleStyles2 = {
      transform: 'translate(-50%, -65%) rotate(2deg)'
    };
    const multipleStyles3 = {
      transform: 'translate(-50%, -50%) rotate(-3deg)'
    };

    const LinkTag = isNoClick ? 'div' : Link;
    const LinkProps = {
      className: 'w-full',
      tag: 'div',
      href: isNoClick ? null : `/product/${handle}`
    };

    return (
      <FadeIn>
        <div className="w-full px-20 flex items-center justify-center">
          <LinkTag {...LinkProps}>
            <div className={containerClassName}>
              {isMultiple ? (
                <Fragment>
                  <img
                    src={voile1}
                    alt={title}
                    className={imageClassName}
                    style={multipleStyles1}
                  />
                  <img
                    src={voile1}
                    alt={title}
                    className={imageClassName}
                    style={multipleStyles2}
                  />
                  <img
                    src={singleImage}
                    alt={title}
                    className={imageClassName}
                    style={multipleStyles3}
                  />
                </Fragment>
              ) : (
                <img
                  className={imageClassName}
                  src={img}
                  alt={title}
                  style={imageStyles}
                />
              )}
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
                  {cleanType} {isNoPrice ? '' : `- £${price}`}
                </Paragraph>
              </div>
            )}
          </LinkTag>
        </div>
      </FadeIn>
    );
  }
}

ProductThumbnail.propTypes = {
  color1: PropTypes.string,
  color2: PropTypes.string,
  image: PropTypes.string
};

ProductThumbnail.defaultProps = {
  color1: '#6b2854',
  color2: '#80aee8'
};
