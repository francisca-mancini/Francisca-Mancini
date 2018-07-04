import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Spacing from '../../../atoms/Spacing';
import ProductShape from '../../../atoms/ProductShape';

import generalStyles from './general.module.css';
import heroStyles from './hero.module.css';

import mainImage1 from '../../../../static/images/_temp/collection/main1.png';
import secondImage1 from '../../../../static/images/_temp/collection/second1.png';
import thirdImage1 from '../../../../static/images/_temp/collection/third1.png';

export default class Fragrance extends PureComponent {
  constructor() {
    super();

    this.state = {
      inView: false,
      containerHeight: 0
    };
  }

  componentDidMount() {
    this.setContainerHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inView !== this.state.inView && this.state.inView) {
      this.props.onIndexChange(this.props.index);
    }
  }

  setContainerHeight() {
    this.setState({ containerHeight: window.innerHeight / 2.5 });
  }

  handleWaypointEnter(previousPosition, currentPosition, event) {
    this.setState({ inView: true });
  }

  handleWaypointLeave(e) {
    this.setState({ inView: false });
  }

  render() {
    const { containerHeight } = this.state;
    const { children, index, color1, color2 } = this.props;

    return (
      <Waypoint
        onEnter={this.handleWaypointEnter.bind(this)}
        onLeave={this.handleWaypointLeave.bind(this)}
        fireOnRapidScroll
        topOffset={`${containerHeight}px`}
        bottomOffset={`${containerHeight}px`}
      >
        <div className={generalStyles.container}>
          <div className={heroStyles.container}>
            <div className={heroStyles.shapeContainer}>
              <div
                className={classNames(heroStyles.shapeRatio, 'pixiContainer')}
              >
                <ProductShape isTransparent color1={color1} color2={color2} />
              </div>
            </div>
            <img
              className={heroStyles.thirdImage}
              src={thirdImage1}
              alt="lol"
            />
            <img
              className={heroStyles.secondImage}
              src={secondImage1}
              alt="lol"
            />
            <img className={heroStyles.mainImage} src={mainImage1} alt="lol" />
          </div>
          <Heading size="m" font="serif" uppercase center>
            {children}
          </Heading>
          <Spacing size={30}>
            <Paragraph size="xl" font="jenson">
              This highly spiritual scent, with Frankincense, incense, musks,
              and fire it can be found after a trip across the north of Africa,
              from the High Atlas to the Nile. There is an altar carved in
              stone, and to the right, on the floor there is an ancient vase.
              Inside this vase, set aside for ceremonial offerings, lays
              Atlantica, a magical ritual perfume made out of the most precious
              oils.
            </Paragraph>
          </Spacing>
        </div>
      </Waypoint>
    );
  }
}
