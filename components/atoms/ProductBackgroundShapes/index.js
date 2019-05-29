import React, { PureComponent } from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import Observer from 'react-intersection-observer';
import SimplexNoise from 'simplex-noise';
import classNames from 'classnames';

import ThresholdGradientFilter from '../../../lib/thresholdGradientShader';
import findParent from '../../../lib/findParent';
import numberToVec from '../../../lib/numberToVec';
import hexToRgb from '../../../lib/hexToRgb';
import setMinMax from '../../../lib/setMinMax';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

import generalStyles from './general.module.css';

import mainShape1 from '../../../static/images/shapes/sandokan.svg';
import mainShape2 from '../../../static/images/shapes/voiledejour.svg';
import mainShape3 from '../../../static/images/shapes/voiledenuit.svg';

export default class ProductBackgroundShapes extends PureComponent {
  constructor() {
    super();

    this.motionFactor = 400;
    this.frameCount = 0;

    this.areas = [
      {
        limit: 10,
        container: null,
        containerPos: {
          x: 0.14,
          y: 0.2
        },
        mainShapeSprite: mainShape1,
        mainShape: null,
        x: 50,
        y: 40,
        motionFactor: 10000,
        xFactor: 200,
        yFactor: 300,
        rotationFactor: 400,
        scaleFactor: 0.8,
        circles: []
      },
      {
        limit: 10,
        container: null,
        containerPos: {
          x: 0.74,
          y: 0.37
        },
        mainShapeSprite: mainShape2,
        mainShape: null,
        x: 40,
        y: 45,
        motionFactor: 10000,
        xFactor: 200,
        yFactor: 300,
        rotationFactor: 300,
        scaleFactor: 0.8,
        circles: []
      },
      {
        limit: 10,
        container: null,
        containerPos: {
          x: 0.39,
          y: 0.65
        },
        mainShapeSprite: mainShape3,
        mainShape: null,
        x: 40,
        y: 50,
        motionFactor: 10000,
        xFactor: 200,
        yFactor: 300,
        rotationFactor: 450,
        scaleFactor: 0.8,
        circles: []
      },
      {
        limit: 10,
        container: null,
        containerPos: {
          x: 0.96,
          y: 0.9
        },
        mainShapeSprite: mainShape2,
        mainShape: null,
        x: 80,
        y: 60,
        motionFactor: 10000,
        xFactor: 200,
        yFactor: 300,
        rotationFactor: 360,
        scaleFactor: 0.8,
        circles: []
      }
    ];

    this.state = {
      isHidden: true
    };

    this.renderPixi = this.renderPixi.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 200, {
      leading: false,
      trailing: true
    });
  }

  componentDidMount() {
    this.initPixi();

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.destroyPixi();
    this.initPixi();
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
      resolution: 1,
      autoResize: true,
      transparent: true
    });

    this.canvasRef.appendChild(this.app.view);
    this.app.ticker.add(this.renderPixi);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.addAreas();
    this.addShaderPass();
  }

  destroyPixi() {
    this.app.destroy(true, true);
  }

  addAreas() {
    this.simplex = new SimplexNoise();
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    this.areas.forEach((item, index) => {
      const containerPosition = {
        x: item.containerPos.x * ww,
        y: item.containerPos.y * wh
      };

      item.container = this.createContainer(containerPosition);
      item.mainShape = this.createShape(item.mainShapeSprite, item.container);
      item.mainShape.scale.set(0.7);

      for (let i = 0; i <= item.limit; i++) {
        const circle = this.createCircle(
          Math.random() * 130,
          0,
          0,
          item.container
        );
        circle.position.set(item.x, item.y);
        circle.scale.set(Math.random());

        item.circles[i] = circle;
      }
    });

    setTimeout(() => {
      this.setState({ isHidden: false });
    }, 1000);
  }

  createContainer(pos) {
    const container = new PIXI.Container();
    container.position.set(pos.x, pos.y);
    this.container.addChild(container);

    return container;
  }

  createShape(sprite, container) {
    const texture = PIXI.Texture.fromImage(sprite);
    const shape = new PIXI.Sprite(texture);
    shape.anchor.set(0.5, 0.5);
    container.addChild(shape);

    return shape;
  }

  createCircle(size, x, y, container) {
    const circle = new PIXI.Graphics();

    circle.lineStyle(0);
    circle.beginFill(this.circleColor, 1);
    circle.drawCircle(x, y, size);
    circle.endFill();

    container.addChild(circle);
    return circle;
  }

  addShaderPass() {
    const { color1, color2 } = this.props;
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.padding = 20;
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

  renderPixi() {
    this.frameCount += 1;

    this.areas.forEach((item, index) => {
      item.mainShape.rotation = Math.sin(this.frameCount / item.rotationFactor);

      for (let i = 0; i <= item.limit; i++) {
        const circle = item.circles[i];
        const x = this.simplex.noise3D(
          circle.x / (item.xFactor * (i / 1.2)),
          circle.y / (item.xFactor / (i / 1.2)),
          this.frameCount / item.motionFactor
        );
        const y = this.simplex.noise3D(
          circle.y / (item.xFactor * (i / 1.2)),
          circle.x / (item.xFactor / (i / 1.2)),
          this.frameCount / item.motionFactor
        );
        const scale = this.simplex.noise2D(
          circle.x / item.xFactor,
          this.frameCount / item.motionFactor
        );

        circle.x += x;
        circle.y += y;
        circle.scale.set(scale);
      }
    });
  }

  render() {
    const { isHidden } = this.state;
    const containerClassName = classNames(generalStyles.container, {
      [generalStyles.containerHidden]: isHidden
    });

    return (
      <div
        className={containerClassName}
        ref={ref => {
          this.canvasRef = ref;
        }}
      />
    );
  }
}

ProductBackgroundShapes.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired
};

ProductBackgroundShapes.defaultProps = {
  color1: '#E88F56',
  color2: '#AC1620'
};
