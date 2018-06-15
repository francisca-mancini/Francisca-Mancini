import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import propToClassName from '../../../../lib/propToClassName';

import generalStyles from './general.module.css';

const alignMap = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  'space-between': 'items-between',
  'space-around': 'items-around'
};

const justifyMap = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around'
};

const directionMap = {
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse'
};

export default function InlineGrid({
  children,
  align,
  justify,
  direction,
  className
}) {
  const alignClassName = propToClassName(align, alignMap);
  const justifyClassName = propToClassName(justify, justifyMap);
  const directionClassName = propToClassName(direction, directionMap);
  const inlineGridClassName = classNames(
    generalStyles.inlineGrid,
    alignClassName,
    justifyClassName,
    directionClassName,
    className
  );

  return <div className={inlineGridClassName}>{children}</div>;
}

InlineGrid.propTypes = {
  children: PropTypes.any,
  align: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(Object.keys(alignMap))),
    PropTypes.oneOf(Object.keys(alignMap))
  ]),
  justify: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(Object.keys(justifyMap))),
    PropTypes.oneOf(Object.keys(justifyMap))
  ]),
  direction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(Object.keys(directionMap))),
    PropTypes.oneOf(Object.keys(directionMap))
  ])
};

InlineGrid.defaultProps = {
  align: 'center',
  justify: 'space-between',
  direction: 'row'
};
