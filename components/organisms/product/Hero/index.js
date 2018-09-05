import React, { PureComponent } from 'react';
import stickybits from 'stickybits';
import classNames from 'classnames';
import { withGlobalState } from 'react-globally';
import find from 'lodash/find';
import { Link } from 'react-scroll';
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';

import { Grid, GridItem } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';
import Spacing from '../../../atoms/Spacing';
import ProductBackgroundShapes from '../../../atoms/ProductBackgroundShapes';

import LearnMore from '../../../molecules/LearnMore';

import getProductImages from '../../../../lib/getProductImages';
import getProductTitle from '../../../../lib/getProductTitle';
import getProductType from '../../../../lib/getProductType';
import getProductPrice from '../../../../lib/getProductPrice';
import getProductDescription from '../../../../lib/getProductDescription';
import getCollectionTitle from '../../../../lib/getCollectionTitle';
import getCleanType from '../../../../lib/getCleanType';
import getProductGradient from '../../../../lib/getProductGradient';
import getSessionStorage from '../../../../lib/getSessionStorage';
import setSessionStorage from '../../../../lib/setSessionStorage';

import generalStyles from './hero.module.css';

class Hero extends PureComponent {
  constructor() {
    super();

    this.addToBag = this.addToBag.bind(this);
  }

  componentDidMount() {
    stickybits('.stickybits');
  }

  addToBag() {
    const basket = getSessionStorage('basket');
    const items = basket.items;
    const count = basket.count;
    let newItems;

    const existing = find(items, o => {
      return o.product.id === this.props.product.id;
    });

    if (existing) {
      existing.quantity += 1;
      newItems = [...items];
    } else {
      newItems = [
        ...items,
        {
          quantity: 1,
          product: this.props.product
        }
      ];
    }

    this.props.setGlobalState({
      cartOpen: true
    });

    setSessionStorage('basket', {
      items: newItems,
      count: count + 1
    });
  }

  render() {
    const { product, dataProduct } = this.props;
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };
    const images = product && getProductImages(product);
    const title = product && getProductTitle(product);
    const type = product && getProductType(product);
    const price = product && getProductPrice(product);
    const description = product && getProductDescription(product);
    const gradient = dataProduct && getProductGradient(dataProduct);
    const collectionTitle =
      product && getCollectionTitle(product.collections.edges[0].node);
    const cleanType = getCleanType(type);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    return (
      <div>
        <ProductBackgroundShapes
          color1={gradient.color1}
          color2={gradient.color2}
        />
        <div className="relative z-10">
          <Grid gap={20} align="stretch">
            <GridItem columnSize={[0, 0, 4]}>
              <div
                style={stickyStyle}
                className={classNames('stickybits', generalStyles.left)}
              >
                <Paragraph weight="semilight" center size="s">
                  {description}
                </Paragraph>
                <div className={generalStyles.footerLeft}>
                  <Paragraph size="s" weight="semilight">
                    {collectionTitle} • {cleanType} • {title}
                  </Paragraph>
                </div>
                <div className={generalStyles.learnMore}>
                  <Link
                    to="story"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer"
                  >
                    <LearnMore>Learn more</LearnMore>
                  </Link>
                </div>
              </div>
            </GridItem>
            <GridItem columnSize={[12, 12, 4]}>
              <MediaQuery minDeviceWidth={768}>
                {images &&
                  images.length &&
                  images.map((item, index) => {
                    return (
                      <div key={index} className={generalStyles.imageContainer}>
                        <img src={item.src} alt="" />
                      </div>
                    );
                  })}
              </MediaQuery>
              <MediaQuery maxDeviceWidth={767}>
                {images &&
                  images.length && (
                    <Slider {...settings}>
                      {images.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={generalStyles.imageContainer}
                          >
                            <img src={item.src} alt={title} />
                          </div>
                        );
                      })}
                    </Slider>
                  )}
              </MediaQuery>
            </GridItem>
            <GridItem columnSize={[12, 12, 4]}>
              <div
                style={stickyStyle}
                className={classNames('stickybits', generalStyles.right)}
              >
                <Heading uppercase size="m" font="serif">
                  {title}
                </Heading>
                <Spacing size={[0, 0, 25]}>
                  <Paragraph size="s" weight="semilight">
                    {cleanType} - £{price}
                  </Paragraph>
                </Spacing>
                <Spacing size={[15, 15, 0]} position="t">
                  <Button size="s" onClick={this.addToBag}>
                    <span className="font-normal">Add to bag</span>
                  </Button>
                </Spacing>
                <div className={generalStyles.footerRight}>
                  <Paragraph weight="semilight" size="s">
                    Free shipping above £100
                  </Paragraph>
                </div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withGlobalState(Hero);
