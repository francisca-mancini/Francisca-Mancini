import React, { PureComponent } from 'react';
import stickybits from 'stickybits';
import classNames from 'classnames';

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

import generalStyles from './hero.module.css';

class Hero extends PureComponent {
  componentDidMount() {
    stickybits('.stickybits');
  }

  render() {
    const { product } = this.props;
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };
    const images = product && getProductImages(product);
    const title = product && getProductTitle(product);
    const type = product && getProductType(product);
    const price = product && getProductPrice(product);
    const description = product && getProductDescription(product);
    const collectionTitle =
      product && getCollectionTitle(product.collections.edges[0].node);
    const cleanType = getCleanType(type);

    console.log(product);

    return (
      <div>
        <ProductBackgroundShapes />
        <div className="relative z-10">
          <Grid gap={30} align="stretch">
            <GridItem columnSize={4}>
              <div
                style={stickyStyle}
                className={classNames('stickybits', generalStyles.left)}
              >
                <Paragraph weight="semilight" center size="s">
                  {description}
                </Paragraph>
                <div className={generalStyles.footerLeft}>
                  <Paragraph size="s">
                    {collectionTitle} • {cleanType} • {title}
                  </Paragraph>
                </div>
                <div className={generalStyles.learnMore}>
                  <LearnMore>Learn more</LearnMore>
                </div>
              </div>
            </GridItem>
            <GridItem columnSize={4}>
              {images &&
                images.length &&
                images.map((item, index) => {
                  return (
                    <div key={index} className={generalStyles.imageContainer}>
                      <img src={item.src} alt="" />
                    </div>
                  );
                })}
            </GridItem>
            <GridItem columnSize={4}>
              <div
                style={stickyStyle}
                className={classNames('stickybits', generalStyles.right)}
              >
                <Heading uppercase size="m" font="serif">
                  {title}
                </Heading>
                <Spacing size={25}>
                  <Paragraph size="s">
                    {type} - £{price}
                  </Paragraph>
                </Spacing>
                <Button size="s">
                  <span className="font-normal">Add to bag</span>
                </Button>
                <div className={generalStyles.footerRight}>
                  <Paragraph size="s">Free shipping above £100</Paragraph>
                </div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Hero;
