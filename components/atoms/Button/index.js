import { Fragment, PureComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Nearby from '../../../lib/nearby';
import lineEq from '../../../lib/lineEq';
import Raf from '../../../lib/raf';

import generalStyles from './general.css';
import sizeStyles from './size.css';
import kindStyles from './kind.css';

const tagList = ['div', 'button', 'span'];

const cx = classNames.bind({ ...generalStyles, ...sizeStyles, ...kindStyles });

export default class Button extends PureComponent {
  constructor() {
    super();

    this.state = {
      isMouseOver: false
    };

    this.bgSettings = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      fraction: 6,
      translateFactor: 0,
      motionFactor: 0.2,
      scale: 1,
      maxScale: 1.1,
      targetScale: 1
    };

    this.innerSettings = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      fraction: 10,
      translateFactor: 0,
      motionFactor: 0.2
    };

    this.RAF = new Raf();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toFloat = this.toFloat.bind(this);
    this.loop = this.loop.bind(this);
  }

  componentDidMount() {
    this.initNearby();

    this.RAF.subscribe(this.loop);
    this.RAF.start();

    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    this.RAF.unsubscribe();
    this.RAF = null;

    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleClick(e) {
    const { onClick } = this.props;
    if (!onClick) return;

    onClick(e);
  }

  toFloat(num) {
    return parseInt(num.toFixed(2));
  }

  handleMouseMove(e) {
    const rawX = e.clientX;
    const rawY = e.clientY;
    const bgBounds = this.bgRef.getBoundingClientRect();
    const bgHalfW = bgBounds.width / 2;
    const bgHalfH = bgBounds.height / 2;
    const innerBounds = this.innerRef.getBoundingClientRect();
    const innerHalfW = innerBounds.width / 2;
    const innerHalfH = innerBounds.height / 2;

    this.bgSettings.x = this.toFloat(
      ((rawX - (bgBounds.left + bgHalfW)) / this.bgSettings.fraction) *
        this.bgSettings.translateFactor
    );
    this.bgSettings.y = this.toFloat(
      ((rawY - (bgBounds.top + bgHalfH)) / this.bgSettings.fraction) *
        this.bgSettings.translateFactor
    );

    this.innerSettings.x = this.toFloat(
      ((rawX - (innerBounds.left + innerHalfW)) / this.innerSettings.fraction) *
        this.innerSettings.translateFactor
    );
    this.innerSettings.y = this.toFloat(
      ((rawY - (innerBounds.top + innerHalfH)) / this.innerSettings.fraction) *
        this.innerSettings.translateFactor
    );
  }

  initNearby() {
    new Nearby(this.innerRef, {
      onProgress: this.handleNearby.bind(this)
    });
  }

  handleNearby(distance) {
    const distanceThreshold = { min: 0, max: 70 };

    if (distance <= distanceThreshold.max) {
      const scale = lineEq(
        1,
        this.bgSettings.maxScale,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );

      this.bgSettings.translateFactor = lineEq(
        0,
        0.5,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );

      this.innerSettings.translateFactor = lineEq(
        0,
        0.5,
        distanceThreshold.max,
        distanceThreshold.min,
        distance
      );

      this.bgSettings.targetScale = this.toFloat(scale);
      this.setState({ isMouseOver: true });
    } else {
      this.setState({ isMouseOver: false });
    }
  }

  loop() {
    if (this.state.isMouseOver) {
      this.bgSettings.scale +=
        (this.bgSettings.targetScale - this.bgSettings.scale) *
        this.bgSettings.motionFactor;
      this.bgSettings.x +=
        (this.bgSettings.targetX - this.bgSettings.x) *
        this.bgSettings.motionFactor;
      this.bgSettings.y +=
        (this.bgSettings.targetY - this.bgSettings.y) *
        this.bgSettings.motionFactor;
      this.innerSettings.x +=
        (this.innerSettings.targetX - this.innerSettings.x) *
        this.innerSettings.motionFactor;
      this.innerSettings.y +=
        (this.innerSettings.targetY - this.innerSettings.y) *
        this.innerSettings.motionFactor;

      this.bgRef.style.transition = '0s';
      this.bgRef.style.transform = `translate(${this.bgSettings.x}px, ${
        this.bgSettings.y
      }px) scale(${this.bgSettings.scale}) rotate(0.01deg)`;

      this.innerRef.style.transition = '0s';
      this.innerRef.style.transform = `translate(${this.innerSettings.x}px, ${
        this.innerSettings.y
      }px) rotate(0.01deg)`;
    } else {
      this.bgRef.style.transform = `translate(0, 0) scale(1) rotate(0.01deg)`;
      this.bgRef.style.transition = '0.4s';

      this.innerRef.style.transform = `translate(0, 0) otate(0.01deg)`;
      this.innerRef.style.transition = '0.4s';
    }
  }

  render() {
    const { tag, href, children, kind, size, prefetch } = this.props;

    const ButtonTag = tag;
    const LinkTag = href ? Link : Fragment;

    return (
      <LinkTag href={href} prefetch={prefetch}>
        <ButtonTag
          className={cx('button', kind, size)}
          onClick={this.handleClick}
        >
          <span
            ref={ref => {
              this.bgRef = ref;
            }}
            className={cx('bg')}
          />
          <span
            ref={ref => {
              this.innerRef = ref;
            }}
            className={cx('inner')}
          >
            {children}
          </span>
        </ButtonTag>
      </LinkTag>
    );
  }
}

Button.propTypes = {
  tag: PropTypes.oneOf(tagList),
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizeStyles)),
  kind: PropTypes.oneOf(Object.keys(kindStyles)),
  onClick: PropTypes.func
};

Button.defaultProps = {
  tag: 'span',
  size: 'm',
  onClick: null,
  kind: 'dark'
};
