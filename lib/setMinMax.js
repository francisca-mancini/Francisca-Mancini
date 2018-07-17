export default function setMinMax(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
