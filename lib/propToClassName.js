/*
 * `prop` - string|number|array - className to be returned
 * `map`  - object              - className to be matched from `prop`
 */

export default function propToClassName(prop, map) {
  // Breakpoint values might change over time
  // check `src/theme-config.js` for reference.
  const breakpointsMap = {
    '0': ' ', // >= 0px
    '1': ' sm:', // >= 576px
    '2': ' md:', // >= 768px
    '3': ' lg:', // >= 992px
    '4': ' xl:' // >= 1400px
  };
  let finalClassName = '';

  if (typeof map !== 'undefined' && typeof map !== 'object') {
    console.error(`Map: "${map}" must be an object`);
    return false;
  }

  if (typeof prop === 'string' || typeof prop === 'number') {
    // if it's a string/number, the className should
    // be on all breakpoints.
    const mappedValue = map ? map[prop.toString()] : prop.toString();

    return mappedValue;
  } else if (Array.isArray(prop)) {
    // if it's an array, let's add the
    // correct prefix for each breakpoint.
    prop.map((value, index) => {
      const breakpoint = breakpointsMap[index.toString()];
      const mappedValue = map ? map[value.toString()] : value;
      const className = mappedValue ? breakpoint + mappedValue : '';

      finalClassName += className;

      return true;
    });

    return finalClassName;
  } else {
    // throw error if it's neither a string, number or an array
    console.error(`Prop: "${prop}" must be a string, number or an array`);
    return false;
  }
}
