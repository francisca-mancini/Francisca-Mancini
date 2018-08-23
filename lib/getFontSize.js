export default function getFontSize(fontSize) {
  const map = {
    xxl: ['m', 'rr-xxl', 'rr-xxl', 'r-xxl', 'xxl'],
    xl: ['r-xl', 'r-xl', 'r-xl', 'l', 'xl'],
    l: ['rr-l', 'rr-l', 'rr-l', 'r-l', 'l'],
    m: ['xxs', 'xxs', 'xxs', 'r-m', 'm']
  };

  const font = map[fontSize];

  return font || fontSize;
}
