import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { VelocityComponent } from 'velocity-react';
import classNames from 'classnames';

import Nearby from '../../../lib/nearby';
import lineEq from '../../../lib/lineEq';

import generalStyles from './general.css';

export default class WordHover extends Component {
  constructor() {
    super();

    this.state = {
      isMouseOver: false,
      bubbleScale: 0,
      bubbleX: 0,
      bubbleY: 0
    };

    this.bubbleSize = 100;

    this.wordRef = null;

    this.handleNearby = throttle(this.handleNearby, 20);
    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 20);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    this.initNearby();
  }

  initNearby() {
    new Nearby(this.wordRef, {
      onProgress: this.handleNearby.bind(this)
    });
  }

  handleNearby(distance) {
    const distanceThreshold = { min: 0, max: 75 };

    if (distance > distanceThreshold.max) {
      this.setState({ isMouseOver: false });
    } else {
      const distanceToOne = lineEq(
        0,
        1,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );

      this.setState({
        bubbleScale: distanceToOne,
        isMouseOver: true
      });
    }
  }

  handleMouseMove(e) {
    const { isMouseOver } = this.state;

    if (isMouseOver) {
      const halfBubble = this.bubbleSize / 2;
      const rawX = e.clientX;
      const rawY = e.clientY;

      this.setState({
        bubbleX: rawX - halfBubble,
        bubbleY: rawY - halfBubble
      });
    }
  }

  render() {
    const { bubbleScale, bubbleX, bubbleY, isMouseOver } = this.state;
    const { children, image } = this.props;
    let animation;

    const bubbleStyle = {
      width: `${this.bubbleSize}px`,
      height: `${this.bubbleSize}px`,
      backgroundImage: `url(${image})`
    };

    const bubbleAnimation = {
      translateX: parseFloat(bubbleX.toFixed(2)),
      translateY: parseFloat(bubbleY.toFixed(2)),
      scale: parseFloat(bubbleScale.toFixed(4))
    };

    const bubbleClassName = classNames(generalStyles.bubble, {
      [generalStyles.bubbleHidden]: !isMouseOver,
      [generalStyles.bubbleVisible]: isMouseOver
    });

    return (
      <span
        className={generalStyles.word}
        ref={ref => {
          this.wordRef = ref;
        }}
      >
        <VelocityComponent
          animation={bubbleAnimation}
          duration={80}
          easing="ease-out"
        >
          <div
            style={bubbleStyle}
            className={bubbleClassName}
            ref={ref => {
              this.areaRef = ref;
            }}
          />
        </VelocityComponent>
        {children}
      </span>
    );
  }
}
