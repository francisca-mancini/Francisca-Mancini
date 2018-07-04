import React, { PureComponent } from 'react';
import Observer from 'react-intersection-observer';
import classNames from 'classnames';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Spacing from '../../../atoms/Spacing';
import ProductShape from '../../../atoms/ProductShape';
import MaxWidth from '../../../atoms/MaxWidth';
import ParallaxWrapper from '../../../atoms/ParallaxWrapper';

import generalStyles from './general.module.css';
import heroStyles from './hero.module.css';

import mainImage1 from '../../../../static/images/_temp/collection/main1.png';
import secondImage1 from '../../../../static/images/_temp/collection/second1.png';
import thirdImage1 from '../../../../static/images/_temp/collection/third1.png';

export default class Fragrance extends PureComponent {
  handleIntersection(inView) {
    if (inView) {
      this.props.onIndexChange(this.props.index);
    }
  }

  render() {
    const { children, color1, color2 } = this.props;

    return (
      <Observer onChange={this.handleIntersection.bind(this)} threshold={0.5}>
        <div className={generalStyles.container}>
          <div className={heroStyles.container}>
            <ParallaxWrapper speed={1}>
              <div className={heroStyles.shapeContainer}>
                <div
                  className={classNames(heroStyles.shapeRatio, 'pixiContainer')}
                >
                  <ProductShape isTransparent color1={color1} color2={color2} />
                </div>
              </div>
            </ParallaxWrapper>
            <ParallaxWrapper speed={1.7}>
              <img
                className={heroStyles.thirdImage}
                src={thirdImage1}
                alt="lol"
              />
            </ParallaxWrapper>
            <ParallaxWrapper speed={2.2}>
              <img
                className={heroStyles.secondImage}
                src={secondImage1}
                alt="lol"
              />
            </ParallaxWrapper>
            <ParallaxWrapper speed={2.8}>
              <img
                className={heroStyles.mainImage}
                src={mainImage1}
                alt="lol"
              />
            </ParallaxWrapper>
          </div>
          <ParallaxWrapper speed={1.2} positionAbsolute={false}>
            <Heading size="m" font="serif" uppercase center>
              {children}
            </Heading>
          </ParallaxWrapper>
          <Spacing size={30}>
            <MaxWidth center value={720}>
              <ParallaxWrapper positionAbsolute={false}>
                <Paragraph size="xl" font="jenson">
                  This highly spiritual scent, with Frankincense, incense,
                  musks, and fire it can be found after a trip across the north
                  of Africa, from the High Atlas to the Nile. There is an altar
                  carved in stone, and to the right, on the floor there is an
                  ancient vase. Inside this vase, set aside for ceremonial
                  offerings, lays Atlantica, a magical ritual perfume made out
                  of the most precious oils.
                </Paragraph>
              </ParallaxWrapper>
            </MaxWidth>
          </Spacing>
        </div>
      </Observer>
    );
  }
}
