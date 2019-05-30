import isNode from 'detect-node';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

function ThresholdGradientFilter() {
  if (!isNode) {
    PIXI.Filter.call(
      this,
      null,
      [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D uSampler;',
        'uniform float threshold;',
        'uniform float c1r;',
        'uniform float c1g;',
        'uniform float c1b;',
        'uniform float c2r;',
        'uniform float c2g;',
        'uniform float c2b;',
        'vec4 color1 = vec4(c1r, c1g, c1b, 1.);',
        'vec4 color2 = vec4(c2r, c2g, c2b, 1.);',
        'void main(void)',
        '{',
        '    vec4 color = texture2D(uSampler, vTextureCoord);',
        '    vec4 mixCol = mix(color1, color2, vTextureCoord.y);',
        '    gl_FragColor = vec4(mixCol.rgba * smoothstep( 0.95 - .05, 0.95, color.r));',
        '}'
      ].join('\n'),
      {
        threshold: { type: '1f', value: 0.95 },
        c1r: { type: '1f', value: 1 },
        c1g: { type: '1f', value: 0 },
        c1b: { type: '1f', value: 0 },
        c2r: { type: '1f', value: 0 },
        c2g: { type: '1f', value: 0 },
        c2b: { type: '1f', value: 1 }
      }
    );
  }
}
if (!isNode) {
  ThresholdGradientFilter.prototype = Object.create(PIXI.Filter.prototype);
  ThresholdGradientFilter.prototype.constructor = ThresholdGradientFilter;
  Object.defineProperties(ThresholdGradientFilter.prototype, {
    threshold: {
      get: () => {
        return this.uniforms.threshold.value;
      },
      set: value => {
        this.uniforms.threshold.value = value;
      }
    },
    c1r: {
      get: () => {
        return this.uniforms.c1r.value;
      },
      set: value => {
        this.uniforms.c1r.value = value;
      }
    },
    c1g: {
      get: () => {
        return this.uniforms.c1g.value;
      },
      set: value => {
        this.uniforms.c1g.value = value;
      }
    },
    c1b: {
      get: () => {
        return this.uniforms.c1b.value;
      },
      set: value => {
        this.uniforms.c1b.value = value;
      }
    },
    c2r: {
      get: () => {
        return this.uniforms.c2r.value;
      },
      set: value => {
        this.uniforms.c2r.value = value;
      }
    },
    c2g: {
      get: () => {
        return this.uniforms.c2g.value;
      },
      set: value => {
        this.uniforms.c2g.value = value;
      }
    },
    c2b: {
      get: () => {
        return this.uniforms.c2b.value;
      },
      set: value => {
        this.uniforms.c2b.value = value;
      }
    }
  });
}

export default ThresholdGradientFilter;
