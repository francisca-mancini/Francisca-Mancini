import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Footer from './index';

storiesOf('molecules/Footer', module).add(
  'default',
  withInfo()(() => <Footer el="tete"/>)
);