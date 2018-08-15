import React, { Fragment } from 'react';

import Heading from '../../atoms/Heading';

import downArrow from '../../../static/images/sprites/down-arrow.svg';

import generalStyles from './general.module.css';

export default function LearnMore({ children }) {
  return (
    <div className={generalStyles.container}>
      <Heading size="xs">{children}</Heading>
      <img className={generalStyles.img} src={downArrow} alt="learn more" />
    </div>
  );
}
