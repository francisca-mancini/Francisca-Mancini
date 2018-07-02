import React, { PureComponent } from 'react';
import stickybits from 'stickybits';
import classNames from 'classnames';

import { Grid, GridItem } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';
import Spacing from '../../../atoms/Spacing';

import generalStyles from './hero.module.css';

import product2 from '../../../../static/images/_temp/product2.png';
import downArrow from '../../../../static/images/sprites/down-arrow.svg';

export default class Hero extends PureComponent {
  componentDidMount() {
    stickybits('.stickybits');
  }

  render() {
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };

    return (
      <Grid gap={50} align="stretch">
        <GridItem columnSize={4}>
          <div
            style={stickyStyle}
            className={classNames('stickybits', generalStyles.left)}
          >
            <Paragraph center size="s">
              Is a highly spiritual scent, with Frankincense, incense, musks,
              and fire, that can be found after a trip across the north of
              Africa, from the High Atlas to the Nile.
            </Paragraph>
            <div className={generalStyles.footerLeft}>
              <Paragraph size="s">
                Collection N°1 Maps, Travel • Fragrances • Atlantica
              </Paragraph>
            </div>
            <div className={generalStyles.learnMore}>
              <Heading size="xs">Learn more</Heading>
              <img src={downArrow} alt="learn more" />
            </div>
          </div>
        </GridItem>
        <GridItem columnSize={4}>
          <div className={generalStyles.imageContainer}>
            <img src={product2} alt="yo" />
          </div>
          <div className={generalStyles.imageContainer}>
            <img src={product2} alt="yo" />
          </div>
          <div className={generalStyles.imageContainer}>
            <img src={product2} alt="yo" />
          </div>
          <div className={generalStyles.imageContainer}>
            <img src={product2} alt="yo" />
          </div>
        </GridItem>
        <GridItem columnSize={4}>
          <div
            style={stickyStyle}
            className={classNames('stickybits', generalStyles.right)}
          >
            <Heading uppercase size="m" font="serif">
              Atlantica
            </Heading>
            <Spacing size={25}>
              <Paragraph size="s">Fragrance bottle, 100ml - £500</Paragraph>
            </Spacing>
            <Button size="s">Add to bag</Button>
            <div className={generalStyles.footerRight}>
              <Paragraph size="s">Free shipping above £100</Paragraph>
            </div>
          </div>
        </GridItem>
      </Grid>
    );
  }
}
