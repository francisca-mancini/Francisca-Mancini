import React, { Fragment } from 'react';

import Heading from '../../atoms/Heading';

import downArrow from '../../../static/images/sprites/down-arrow.svg';

export default function LearnMore({ children }) {
  return (
    <Fragment>
      <Heading size="xs">{children}</Heading>
      <img src={downArrow} alt="learn more" />
    </Fragment>
  );
}
