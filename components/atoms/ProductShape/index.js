import React, { Component } from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';

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

    this.circleColor = 0xff0000;
    this.baseShapeSize = 150;
    this.circlesSize = 200;
    this.movingCirclesCount = 10;
    this.movingFactor = 70;
    this.renderDelta = 0;
    this.movingCircles = [];

    this.renderPixi = this.renderPixi.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    if (!isNode) {
      this.initPixi();
      this.addShaderPass();
    }

    // window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    // window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    if (!this.baseCircle) return;

    const mouseposition = this.app.renderer.plugins.interaction.mouse.global;

    this.baseCircle.x = mouseposition.x - this.baseCircle.width;
    this.baseCircle.y = mouseposition.y - this.baseCircle.height;
  }

  initPixi() {
    const parent = findParent(this.canvasRef, 'pixiContainer');

    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

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

    this.handleMouseMove();
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
