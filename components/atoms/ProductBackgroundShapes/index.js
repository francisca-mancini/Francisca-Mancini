import React, { PureComponent } from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Observer from 'react-intersection-observer';
import SimplexNoise from 'simplex-noise';

import ThresholdGradientFilter from '../../../lib/thresholdGradientShader';
import findParent from '../../../lib/findParent';
import numberToVec from '../../../lib/numberToVec';
import hexToRgb from '../../../lib/hexToRgb';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

export default class ProductBackgroundShapes extends PureComponent {
  constructor() {
    super();

    this.motionFactor = 400;
    this.frameCount = 0;

    this.areas = [
      {
        limit: 6,
        x: 300,
        y: 300,
        motionFactor: 600,
        xFactor: 200,
        yFactor: 300,
        circles: []
      },
      {
        limit: 2,
        x: 600,
        y: 460,
        motionFactor: 900,
        xFactor: 200,
        yFactor: 300,
        circles: []
      },
      {
        limit: 5,
        x: 400,
        y: 600,
        motionFactor: 800,
        xFactor: 200,
        yFactor: 300,
        circles: []
      }
    ];

    this.renderPixi = this.renderPixi.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    // if (!isNode) {
    this.initPixi();
    this.addShaderPass();
    // }
  }

  handleVisibilityChange(inView) {
    if (inView) {
      if (this.app) this.app.ticker.start();
    } else {
      if (this.app) this.app.ticker.stop();
    }
  }

  initPixi() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      powerPreference: 'high-performance',
      resolution: 2,
      autoResize: true,
      transparent: true
    });

    this.canvasRef.appendChild(this.app.view);
    this.app.ticker.add(this.renderPixi);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.addAreas();
  }

  addAreas() {
    this.simplex = new SimplexNoise();

    this.areas.forEach((item, index) => {
      for (let i = 0; i <= item.limit; i++) {
        const circle = this.createCircle(100, 0, 0);
        item.circles[index] = circle;
        item.circles[index].x = item.x;
        item.circles[index].y = item.y;
      }
    });
  }

  addShaderPass() {
    const { color1, color2 } = this.props;
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
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
    this.frameCount += 1;

    // const y = this.simplex.noise2D(this.circle.y, this.frameCount / 1000);

    // console.log(this.renderDelta)
    // console.log(x * )

    this.areas.forEach((item, index) => {
      for (let i = 0; i <= item.limit; i++) {
        const circle = item.circles[index];
        const x = this.simplex.noise3D(
          circle.x / item.xFactor,
          circle.y / item.yFactor,
          this.frameCount / item.motionFactor
        );
        const y = this.simplex.noise3D(
          circle.y / item.yFactor,
          circle.x / item.xFactor,
          this.frameCount / item.motionFactor
        );
        const scale = this.simplex.noise2D(
          circle.scale.x / item.xFactor,
          this.frameCount / item.motionFactor
        );

        circle.x += x;
        circle.y += y;
        circle.scale.x = circle.scale.y = scale;
      }
    });

    // this.circle.y += y;
  }

  render() {
    return (
      <Observer onChange={this.handleVisibilityChange}>
        <div
          className="fixed pin"
          ref={ref => {
            this.canvasRef = ref;
          }}
        />
      </Observer>
    );
  }
}

ProductBackgroundShapes.propTypes = {
  color1: PropTypes.array.isRequired,
  color2: PropTypes.array.isRequired
};

ProductBackgroundShapes.defaultProps = {
  color1: '#E88F56',
  color2: '#AC1620'
};
