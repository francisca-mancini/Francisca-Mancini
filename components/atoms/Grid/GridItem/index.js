import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import GridContext from '../../../contexts/GridContext';

import propToClassName from '../../../../lib/propToClassName';

const gapMap = {
  '0': 'px-0',
  '5': 'px-5',
  '10': 'px-10',
  '20': 'px-20',
  '30': 'px-30',
  '40': 'px-40',
  '50': 'px-50'
};

// columnSize can be a number from 1 to 12
// we need to map it to correct width classNames
const columnSizeMap = {
  '1': 'w-8',
  '2': 'w-16',
  '3': 'w-25',
  '4': 'w-33',
  '5': 'w-41',
  '6': 'w-50',
  '7': 'w-58',
  '8': 'w-66',
  '9': 'w-75',
  '10': 'w-83',
  '11': 'w-91',
  '12': 'w-100'
};

export default function GridItem({ children, columnSize }) {
  const columnSizeClassName = propToClassName(columnSize, columnSizeMap);

  return (
    <GridContext.Consumer>
      {value => {
        const gapClassName = propToClassName(value.gap, gapMap);
        const gridItemClassName = classNames(columnSizeClassName, gapClassName);

        return <div className={gridItemClassName}>{children}</div>;
      }}
    </GridContext.Consumer>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
  columnSize: PropTypes.oneOfType([PropTypes.array, PropTypes.number])
};
