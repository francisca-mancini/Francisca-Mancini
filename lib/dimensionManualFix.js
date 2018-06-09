export default function dimensionManualFix(
  filterManager,
  input,
  output,
  clear
) {
  this.uniforms.dimensions[0] = input.sourceFrame.width;
  this.uniforms.dimensions[1] = input.sourceFrame.height;

  // draw the filter...
  filterManager.applyFilter(this, input, output, clear);
}
