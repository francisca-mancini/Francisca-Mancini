import isNode from 'detect-node';

let PIXI;

if (!isNode) {
  PIXI = require('pixi.js');
}

function GradientFilter() {
  if (!isNode) {
    PIXI.Filter.call(
      this,
      null,
      [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform vec4 filterArea;',
        // 'uniform vec2 dimensions;',
        'varying vec2 vFilterCoord;',
        'uniform sampler2D uSampler;',
        'vec4 color1 = vec4(0.7843137254901961, 1, 0, 1);',
        'vec4 color2 = vec4(1, 0, 1, 1);',
        // 'vec2 screenCoord = (vTextureCoord * filterArea.xy + filterArea.zw);',
        // 'vec2 pixelCoord = vTextureCoord * filterArea.xy;',
        // 'vec2 normalizedCoord = pixelCoord / dimensions;',
        'void main() {',
        '  vec4 mixCol = mix(color2, color1, vFilterCoord.y);',
        '  vec4 fg = texture2D(uSampler, vTextureCoord);',
        '  gl_FragColor = mix(fg, mixCol, 1.0);',
        '}'
      ].join('\n'),
      {}
    );
  }
}
if (!isNode) {
  GradientFilter.prototype = Object.create(PIXI.Filter.prototype);
  GradientFilter.prototype.constructor = GradientFilter;
  Object.defineProperties(GradientFilter.prototype, {
    color1: {
      get: function() {
        return this.uniforms.color1.value;
      },
      set: function(value) {
        this.uniforms.color1.value = value;
      }
    },
    color2: {
      get: function() {
        return this.uniforms.color2.value;
      },
      set: function(value) {
        this.uniforms.color2.value = value;
      }
    }
  });
}

export default GradientFilter;
