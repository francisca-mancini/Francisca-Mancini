import React, { Component } from 'react';
import isNode from 'detect-node';

import ThresholdFilter from '../../../lib/thresholdGradientShader';
import GradientFilter from '../../../lib/gradientFilter';
import GradientTestFilter from '../../../lib/gradientTestFilter';
import findParent from '../../../lib/findParent';
import createLinearGradient from '../../../lib/createLinearGradient';

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
    this.movingCirclesCount = 4;
    this.renderDelta = 0;
    this.movingCircles = [];

    this.renderPixi = this.renderPixi.bind(this);
  }

  componentDidMount() {
    if (!isNode) {
      this.initPixi();
      this.addShaderPass();
      // this.addGradientPass();
    }
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
    // this.createGradientCanvas();
  }

  createGradientCanvas() {
    const stops = ['#ff0000', '#0600ff'];

    createLinearGradient(
      this.width,
      this.height,
      stops,
      this.addGradient.bind(this)
    );
  }

  addShaderPass() {
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.autoFit = true;

    const thresholdFilter = new ThresholdFilter();

    this.container.filters = [blurFilter, thresholdFilter];
    this.container.filterArea = this.app.screen;
  }

  addGradientPass() {
    // var graphics = new PIXI.Graphics();
    // graphics.beginFill(0xFF700B, 1);
    // graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
    // this.app.stage.addChild(graphics);

    const gradientFilter = new GradientTestFilter();
    gradientFilter.autoFit = true;
    gradientFilter.filterArea = this.app.screen;

    this.container.filters = [gradientFilter];
  }

  addGradient(canvas) {
    this.gradient = PIXI.Sprite.from(canvas);

    this.app.stage.addChild(this.gradient);

    this.gradient.blendMode = PIXI.BLEND_MODES.ADD;
    // this.container.mask = this.gradient;
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
          x: Math.random() >= 0.5 ? Math.random() * 30 : Math.random() * -20,
          y: Math.random() >= 0.5 ? Math.random() * 20 : Math.random() * -30
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

        item.circle.x = Math.cos(this.renderDelta) * item.movingFactor.x;
        item.circle.y = Math.sin(this.renderDelta) * item.movingFactor.y;
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
