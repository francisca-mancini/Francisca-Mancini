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
        'vec4 color1 = vec4(1, 1, 0, 1);',
        'vec4 color2 = vec4(1, 0, 1, 1);',
        'void main(void)',
        '{',
        '    vec4 color = texture2D(uSampler, vTextureCoord);',
        '    vec3 mcolor = vec3(color.r, color.g, color.b);',
        '    vec4 mixCol = mix(color2, color1, vTextureCoord.y);',
        '    vec4 fg = texture2D(uSampler, vTextureCoord);',
        '    if (color.a > threshold) {',
        '       gl_FragColor = mix(fg, mixCol, 1.0);',
        '    } else {',
        '       gl_FragColor = vec4(vec3(0.0), 0.0);',
        '    }',
        '}'
      ].join('\n'),
      {
        threshold: { type: '1f', value: 0.95 }
      }
    );
  }
}
if (!isNode) {
  ThresholdGradientFilter.prototype = Object.create(PIXI.Filter.prototype);
  ThresholdGradientFilter.prototype.constructor = ThresholdGradientFilter;
  Object.defineProperties(ThresholdGradientFilter.prototype, {
    threshold: {
      get: function() {
        return this.uniforms.threshold.value;
      },
      set: function(value) {
        this.uniforms.threshold.value = value;
      }
    }
  });
}

export default ThresholdGradientFilter;
