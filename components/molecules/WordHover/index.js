import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import classNames from 'classnames';
import Observer from 'react-intersection-observer';

import Nearby from '../../../lib/nearby';
import lineEq from '../../../lib/lineEq';
import Raf from '../../../lib/raf';

import generalStyles from './general.module.css';

export default class WordHover extends Component {
  constructor() {
    super();

    this.state = {
      isMouseOver: false,
      hasOvered: false
    };

    this.bubbleSize = 100;
    this.duration = 200;
    this.motionFactor = 0.15;
    this.mousePos = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.scale = 0;
    this.targetScale = 0;
    this.RAF = new Raf();

    this.wordRef = null;

    this.handleNearby = throttle(this.handleNearby, 20);
    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 10);
    this.loop = this.loop.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove, {
      passive: true
    });
    this.initNearby();
    this.setBubblePosition();

    this.RAF.subscribe(this.loop);
    this.RAF.start();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMouseOver !== this.state.isMouseOver) {
      if (this.state.isMouseOver) {
        document.body.className += ' cursor';
      } else {
        document.querySelector('body').classList.remove('cursor');
      }
    }
  }

  componentWillUnmount() {
    this.RAF.unsubscribe();
    this.RAF = null;
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleVisibilityChange(inView) {
    if (inView) {
      this.RAF.start();
      window.addEventListener('mousemove', this.handleMouseMove);
    } else {
      this.RAF.stop();
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  initNearby() {
    new Nearby(this.wordRef, {
      onProgress: this.handleNearby.bind(this)
    });
  }

  setBubblePosition() {
    const bounds = this.wordRef.getBoundingClientRect();

    this.position.x = bounds.left;
    this.position.y = bounds.top;
  }

  handleNearby(distance) {
    const distanceThreshold = { min: 0, max: 40 };

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

      this.targetScale = distanceToOne;
      this.setState({ isMouseOver: true, hasOvered: true });
    }
  }

  handleMouseMove(e) {
    const { isMouseOver, hasOvered } = this.state;

    if (isMouseOver) {
      const halfBubble = this.bubbleSize / 2;
      const rawX = e.clientX;
      const rawY = e.clientY;

      const targetPosition = {
        x: rawX - halfBubble,
        y: rawY - halfBubble
      };

      this.mousePos = {
        x: targetPosition.x,
        y: targetPosition.y
      };
    } else {
      if (!hasOvered) {
        this.setBubblePosition();
      }
    }
  }

  loop() {
    this.position.x += (this.mousePos.x - this.position.x) * this.motionFactor;
    this.position.y += (this.mousePos.y - this.position.y) * this.motionFactor;
    this.scale += (this.targetScale - this.scale) * this.motionFactor;

    this.bubbleRef.style.transform = `translate(${this.position.x}px, ${
      this.position.y
    }px) scale(${this.scale})`;
  }

  render() {
    const { isMouseOver } = this.state;
    const { children, image } = this.props;

    const bubbleStyle = {
      width: `${this.bubbleSize}px`,
      height: `${this.bubbleSize}px`,
      backgroundImage: `url(${image})`
    };

    const bubbleClassName = classNames(generalStyles.bubble, {
      [generalStyles.bubbleHidden]: !isMouseOver,
      [generalStyles.bubbleVisible]: isMouseOver
    });

    const wordClassName = classNames(generalStyles.word, {
      [generalStyles.cursor]: isMouseOver
    });

    return (
      <span className="whitespace-no-wrap">
        <Observer tag="span" onChange={this.handleVisibilityChange}>
          <span
            className={wordClassName}
            ref={ref => {
              this.wordRef = ref;
            }}
          >
            <div
              style={bubbleStyle}
              className={bubbleClassName}
              ref={ref => {
                this.bubbleRef = ref;
              }}
            />
            {children}
          </span>
        </Observer>
      </span>
    );
  }
}
