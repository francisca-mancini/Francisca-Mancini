import React, { Component } from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import ThresholdGradientFilter from '../../../lib/thresholdGradientShader';
import findParent from '../../../lib/findParent';
import numberToVec from '../../../lib/numberToVec';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

export default class ProductShape extends Component {
  constructor() {
    super();

    this.circleSizeFactor = 2.6;
    this.baseSizeFactor = 3.6;

    this.circleColor = 0xff0000;
    this.movingCirclesCount = 5;
    this.movingFactor = 50;
    this.renderDelta = 0;
    this.movingCircles = [];

    this.renderPixi = this.renderPixi.bind(this);
    this.resize = throttle(this.resize.bind(this), 100);
  }

  componentDidMount() {
    if (!isNode) {
      this.initPixi();
      this.addShaderPass();
    }

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    const parent = findParent(this.canvasRef, 'pixiContainer');

    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.baseShapeSize = this.width / this.baseSizeFactor;
    this.circlesSize = this.width / this.circleSizeFactor;
  }

  initPixi() {
    const parent = findParent(this.canvasRef, 'pixiContainer');

    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.baseShapeSize = this.width / this.baseSizeFactor;
    this.circlesSize = this.width / this.circleSizeFactor;

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      powerPreference: 'high-performance',
      resolution: 2,
      autoResize: true,
      transparent: false,
      backgroundColor: 0xffffff
    });

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
    blurFilter.autoFit = true;

    const thresholdGradientFilter = new ThresholdGradientFilter();
    thresholdGradientFilter.autoFit = true;
    thresholdGradientFilter.uniforms.c1r = numberToVec(color1[0]);
    thresholdGradientFilter.uniforms.c1g = numberToVec(color1[1]);
    thresholdGradientFilter.uniforms.c1b = numberToVec(color1[2]);
    thresholdGradientFilter.uniforms.c2r = numberToVec(color2[0]);
    thresholdGradientFilter.uniforms.c2g = numberToVec(color2[1]);
    thresholdGradientFilter.uniforms.c2b = numberToVec(color2[2]);

    this.container.filters = [blurFilter, thresholdGradientFilter];
    this.container.filterArea = this.app.screen;
  }

  addBaseShape() {
    this.baseCircle = this.createCircle(this.baseShapeSize, 0, 0);
  }

  addMovingCircles() {
    for (let i = 0; i <= this.movingCirclesCount; i++) {
      const random = Math.random();
      const circle = this.createCircle(this.circlesSize, 0, 0);

      this.movingCircles.push({
        circle: circle,
        movingFactor: {
          x:
            Math.random() >= 0.5
              ? Math.random() * this.movingFactor
              : Math.random() * -this.movingFactor,
          y:
            Math.random() >= 0.5
              ? Math.random() * -this.movingFactor
              : Math.random() * this.movingFactor
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
    return (
      <div
        className="absolute pin"
        ref={ref => {
          this.canvasRef = ref;
        }}
      />
    );
  }
}

ProductShape.propTypes = {
  color1: PropTypes.array.isRequired,
  color2: PropTypes.array.isRequired
};
