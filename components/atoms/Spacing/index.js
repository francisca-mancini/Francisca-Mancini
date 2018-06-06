import React from 'react';
import PropTypes from 'prop-types';

import propToClassName from '../../../lib/propToClassName';

export default function Spacing({ children, size, type, position }) {
  const newType = type === 'margin' ? 'm' : 'p';
  const mergedProps = mergeProps(newType, position, size);
  const spacingClassNames = propToClassName(mergedProps);

  return <div className={spacingClassNames}>{children}</div>;
}

function mergeProps(type, position, size) {
  const newArray = [];
  const _position = position === 'all' ? '' : position;

  if (Array.isArray(size)) {
    size.map(item => {
      const newProp = `${type}${_position}-${item}`;
      newArray.push(newProp);

      return true;
    });
  } else {
    return `${type}${_position}-${size}`;
  }

  return newArray;
}

Spacing.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    PropTypes.number,
    PropTypes.string
  ]),
  position: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(['all', 'y', 'x', 't', 'b', 'r', 'l'])),
    PropTypes.oneOf(['all', 'y', 'x', 't', 'b', 'r', 'l'])
  ]),
  type: PropTypes.oneOf(['margin', 'padding'])
};

Spacing.defaultProps = {
  size: 60,
  position: 'y',
  type: 'margin'
};
