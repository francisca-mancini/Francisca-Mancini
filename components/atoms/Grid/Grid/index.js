import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import propToClassName from '../../../../lib/propToClassName';

import GridContext from '../../../contexts/GridContext';

import generalStyles from './general.css';

const gapMap = {
  '0': '-mx-0',
  '5': '-mx-5',
  '10': '-mx-10',
  '20': '-mx-20',
  '30': '-mx-30',
  '40': '-mx-40',
  '50': '-mx-50'
};

const alignMap = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch'
};

const justifyMap = {
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  stretch: 'justify-stretch'
};

export default function Grid({ children, direction, gap, align, justify }) {
  const directionClassName = propToClassName(direction);
  const gapClassName = propToClassName(gap, gapMap);
  const alignClassName = propToClassName(align, alignMap);
  const justifyClassName = propToClassName(justify, justifyMap);

  const gridClassName = classNames(
    generalStyles.grid,
    directionClassName,
    alignClassName,
    gapClassName,
    justifyClassName
  );

  return (
    <GridContext.Provider value={{ gap }}>
      <div className={gridClassName}>{children}</div>
    </GridContext.Provider>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  gap: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(gapMap).map(key => parseInt(key, 10)))
    ),
    PropTypes.oneOf(Object.keys(gapMap).map(key => parseInt(key, 10)))
  ]),
  align: PropTypes.oneOf(Object.keys(alignMap)),
  justify: PropTypes.oneOf(Object.keys(justifyMap))
};

Grid.defaultProps = {
  gap: [20, 20, 50],
  direction: 'flex-row',
  align: 'center',
  justify: 'start'
};
