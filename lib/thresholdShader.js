import isNode from 'detect-node';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

function ThresholdFilter() {
  if (!isNode) {
    PIXI.Filter.call(
      this,
      null,
      [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D uSampler;',
        'uniform float threshold;',
        'void main(void)',
        '{',
        '    vec4 color = texture2D(uSampler, vTextureCoord);',
        '    vec3 mcolor = vec3(255.0/255.0, 255.0/255.0, 255.0/255.0);',
        '    if (color.a > threshold) {',
        '       gl_FragColor = vec4(mcolor, 1.0);',
        '    } else {',
        '       gl_FragColor = vec4(vec3(0.0), 0.0);',
        '    }',
        '}'
      ].join('\n'),
      {
        threshold: { type: '1f', value: 0.5 }
      }
    );
  }
}
if (!isNode) {
  ThresholdFilter.prototype = Object.create(PIXI.Filter.prototype);
  ThresholdFilter.prototype.constructor = ThresholdFilter;
  Object.defineProperties(ThresholdFilter.prototype, {
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

export default ThresholdFilter;
