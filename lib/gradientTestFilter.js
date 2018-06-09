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
        'uniform sampler2D uSampler;',
        'void main() {',
        '  vec4 color = texture2D(uSampler, vTextureCoord);',
        '  vec3 mcolor = vec3(color.r, color.g, color.b);',
        '  if (color.a < 0.9) {',
        '     gl_FragColor = vec4(mcolor, 1.0);',
        '  } else {',
        '     gl_FragColor = vec4(vec3(1.0), 0.0);',
        '  }',
        '}'
      ].join('\n'),
      {}
    );
  }
}
if (!isNode) {
  GradientFilter.prototype = Object.create(PIXI.Filter.prototype);
  GradientFilter.prototype.constructor = GradientFilter;
  // Object.defineProperties(GradientFilter.prototype, {
  //   color1: {
  //     get: function () {
  //       return this.uniforms.color1.value;
  //     },
  //     set: function (value) {
  //       this.uniforms.color1.value = value;
  //     }
  //   },
  //   color2: {
  //     get: function () {
  //       return this.uniforms.color2.value;
  //     },
  //     set: function (value) {
  //       this.uniforms.color2.value = value;
  //     }
  //   }
  // });
}

export default GradientFilter;
