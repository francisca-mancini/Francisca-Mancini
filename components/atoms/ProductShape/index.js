import React, { Component } from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Observer from 'react-intersection-observer';
import classNames from 'classnames';

import ThresholdGradientFilter from '../../../lib/thresholdGradientShader';
import findParent from '../../../lib/findParent';
import numberToVec from '../../../lib/numberToVec';
import hexToRgb from '../../../lib/hexToRgb';

import generalStyles from './general.module.css';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

export default class ProductShape extends Component {
  constructor() {
    super();

    this.circleSizeFactor = 3.3;
    this.baseSizeFactor = 4.4;

    this.circleColor = 0xff0000;
    this.movingCirclesCount = 5;
    this.movingFactor = 50;
    this.discoveryMovingFactor = 100;
    this.renderDelta = 0;
    this.movingCircles = [];

    this.state = {
      isHidden: true
    };

    this.renderPixi = this.renderPixi.bind(this);
    this.resize = throttle(this.resize.bind(this), 100);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    if (!isNode) {
      this.initPixi();
      this.addShaderPass();

      setTimeout(() => {
        this.setState({ isHidden: false });
      }, 1000);
    }

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleVisibilityChange(inView) {
    if (inView) {
      if (this.app) this.app.ticker.start();
    } else {
      if (this.app) this.app.ticker.stop();
    }
  }

  resize() {
    const { isDiscovery } = this.props;
    const parent = findParent(this.canvasRef, 'pixiContainer');

    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.baseShapeSize = isDiscovery
      ? this.height / this.baseSizeFactor
      : this.width / this.baseSizeFactor;
    this.circlesSize = isDiscovery
      ? this.height / this.circleSizeFactor
      : this.width / this.circleSizeFactor;
  }

  initPixi() {
    const { isDiscovery } = this.props;
    const parent = findParent(this.canvasRef, 'pixiContainer');

    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.baseShapeSize = isDiscovery
      ? this.height / this.baseSizeFactor
      : this.width / this.baseSizeFactor;
    this.circlesSize = isDiscovery
      ? this.height / this.circleSizeFactor
      : this.width / this.circleSizeFactor;

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      powerPreference: 'high-performance',
      resolution: 2,
      autoResize: true,
      transparent: this.props.isTransparent
    });
    if (!this.props.isTransparent) {
      this.app.renderer.backgroundColor = 0xffffff;
    }

    this.canvasRef.appendChild(this.app.view);
    this.app.ticker.add(this.renderPixi);

    this.container = new PIXI.Container();

    this.app.stage.addChild(this.container);
    this.container.x = (this.app.screen.width - this.container.width) / 2;
    this.container.y = (this.app.screen.height - this.container.height) / 2;

    this.addBaseShape();
    this.addMovingCircles();
  }

  addShaderPass() {
    const { color1, color2 } = this.props;
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.padding = 0;
    blurFilter.autoFit = true;

    const thresholdGradientFilter = new ThresholdGradientFilter();
    thresholdGradientFilter.autoFit = true;
    thresholdGradientFilter.uniforms.c1r = numberToVec(hexToRgb(color1).r);
    thresholdGradientFilter.uniforms.c1g = numberToVec(hexToRgb(color1).g);
    thresholdGradientFilter.uniforms.c1b = numberToVec(hexToRgb(color1).b);
    thresholdGradientFilter.uniforms.c2r = numberToVec(hexToRgb(color2).r);
    thresholdGradientFilter.uniforms.c2g = numberToVec(hexToRgb(color2).g);
    thresholdGradientFilter.uniforms.c2b = numberToVec(hexToRgb(color2).b);

    this.container.filters = [blurFilter, thresholdGradientFilter];
    this.container.filterArea = this.app.screen;
  }

  addBaseShape() {
    this.baseCircle = this.createCircle(this.baseShapeSize, 0, 0);
  }

  addMovingCircles() {
    const { isDiscovery } = this.props;

    for (let i = 0; i <= this.movingCirclesCount; i++) {
      const random = Math.random();
      const circle = this.createCircle(this.circlesSize, 0, 0);

      this.movingCircles.push({
        circle: circle,
        movingFactor: {
          x:
            Math.random() >= 0.5
              ? Math.random() *
                (isDiscovery ? this.discoveryMovingFactor : this.movingFactor)
              : Math.random() *
                (isDiscovery
                  ? -this.discoveryMovingFactor
                  : -this.movingFactor),
          y:
            Math.random() >= 0.5
              ? Math.random() *
                (isDiscovery ? -this.movingFactor / 1.4 : -this.movingFactor)
              : Math.random() *
                (isDiscovery ? this.movingFactor / 1.4 : this.movingFactor)
        },
        scaleFactor: Math.random() + 0.2
      });
    }
  }

  createCircle(size, x, y) {
    const circle = new PIXI.Graphics();

    circle.lineStyle(0);
    circle.beginFill(this.circleColor, 1);
    circle.drawCircle(x, y, size);
    circle.endFill();
    circle.interactive = true;

    this.container.addChild(circle);
    return circle;
  }

  renderPixi() {
    this.renderDelta += 0.005;

    if (this.movingCircles.length > 0) {
      this.movingCircles.forEach(item => {
        const rawScale = Math.sin(this.renderDelta / 10) * 1.2;

        item.circle.x = Math.sin(this.renderDelta) * item.movingFactor.x;
        item.circle.y = Math.cos(this.renderDelta) * item.movingFactor.y;
      });
    }
  }

  render() {
    const { isHidden } = this.state;
    const containerClassName = classNames(generalStyles.container, {
      [generalStyles.containerHidden]: isHidden
    });
    return (
      <Observer onChange={this.handleVisibilityChange}>
        <div
          className={containerClassName}
          ref={ref => {
            this.canvasRef = ref;
          }}
        />
      </Observer>
    );
  }
}

ProductShape.propTypes = {
  color1: PropTypes.array.isRequired,
  color2: PropTypes.array.isRequired,
  isTransparent: PropTypes.bool
};

ProductShape.defaultProps = {
  isTransparent: false
};
