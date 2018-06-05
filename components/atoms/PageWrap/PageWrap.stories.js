import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import PageWrap from './index';

storiesOf('atoms/PageWrap', module).add(
  'default',
  withInfo()(() => <PageWrap>I'm a PageWrap</PageWrap>)
);
