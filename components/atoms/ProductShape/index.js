import React, { Component } from 'react';
import isNode from 'detect-node';

import ThresholdFilter from '../../../lib/thresholdShader';
import findParent from '../../../lib/findParent';
import createLinearGradient from '../../../lib/createLinearGradient';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

export default class ProductShape extends Component {
  constructor() {
    super();

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
      transparent: false
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

  addGradient() {
    const gradientCanvas = createLinearGradient(
      this.width,
      this.height,
      [0xff0000, 0x0600ff],
      canvas => {
        console.log(canvas);
      }
    );
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
    circle.beginFill(0xffffff, 1);
    circle.drawCircle(x, y, size);
    circle.endFill();
    circle.interactive = true;

    this.container.addChild(circle);
    return circle;
  }

  addShaderPass() {
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.autoFit = true;

    const thresholdFilter = new ThresholdFilter();

    this.container.filters = [blurFilter, thresholdFilter];
    this.container.filterArea = this.app.screen;
  }

  renderPixi() {
    this.renderDelta += 0.005;

    if (this.movingCircles.length > 0) {
      this.movingCircles.forEach(item => {
        const rawScale = Math.sin(this.renderDelta / 10) * 1.2;
        // const scale = Math.min(Math.max(parseInt(rawScale), 0.8), 1.2);

        item.circle.x = Math.cos(this.renderDelta) * item.movingFactor.x;
        item.circle.y = Math.sin(this.renderDelta) * item.movingFactor.y;
        // item.circle.scale.set(scale, scale);
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
