import React, { PureComponent } from 'react';
import Observer from 'react-intersection-observer';
import classNames from 'classnames';

import AtomLink from '../../../atoms/Link';
import Button from '../../../atoms/Button';
import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Spacing from '../../../atoms/Spacing';
import ProductShape from '../../../atoms/ProductShape';
import MaxWidth from '../../../atoms/MaxWidth';
import ParallaxWrapper from '../../../atoms/ParallaxWrapper';

import Story from '../Story';

import getFontSize from '../../../../lib/getFontSize';

import generalStyles from './general.module.css';
import heroStyles from './hero.module.css';

export default class Fragrance extends PureComponent {
  constructor() {
    super();

    this.threshold = 0.3;
  }
  componentDidMount() {
    if (window.innerWidth >= 768) {
      this.threshold = 0.5;
    } else {
      this.threshold = 0.3;
    }
  }

  handleIntersection(inView) {
    if (inView) {
      this.props.onIndexChange(this.props.index);
      this.props.onFirstOut(false);
    } else if (!inView && this.props.index === 0) {
      this.props.onFirstOut(true);
    }
  }

  render() {
    const {
      story,
      children,
      color1,
      color2,
      image1,
      image2,
      image3,
      title,
      handle,
      layeringHandle
    } = this.props;

    return (
      <Observer
        onChange={this.handleIntersection.bind(this)}
        threshold={this.threshold}
      >
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
              <img className={heroStyles.thirdImage} src={image3} alt="" />
            </ParallaxWrapper>
            <ParallaxWrapper speed={2.2}>
              <img className={heroStyles.secondImage} src={image2} alt="" />
            </ParallaxWrapper>
            <ParallaxWrapper speed={2.8}>
              <img className={heroStyles.mainImage} src={image1} alt="" />
            </ParallaxWrapper>
          </div>
          <ParallaxWrapper speed={1.2} positionAbsolute={false}>
            <Heading
              size={getFontSize('m')}
              tracking="025"
              font="serif"
              uppercase
              center
            >
              {children}
            </Heading>
          </ParallaxWrapper>
          <Spacing size={30}>
            <MaxWidth center value={720}>
              <Story description={story} />
            </MaxWidth>
          </Spacing>
          <div className="md-hidden flex flex-col items-center justify-center">
            <Button size="s">
              <AtomLink href={`/product/${handle}`}>
                <span className="font-normal">Shop {title}</span>
              </AtomLink>
            </Button>
            {layeringHandle && (
              <Spacing size={20} position="t">
                <AtomLink
                  className="opacity-50 hover-opacity-100"
                  tag="a"
                  href={`/product/${layeringHandle}`}
                  underline
                >
                  <Heading size="xs">Shop pack</Heading>
                </AtomLink>
              </Spacing>
            )}
          </div>
        </div>
      </Observer>
    );
  }
}
