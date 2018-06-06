import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './index';

storiesOf('molecules/Header', module).add(
  'default',
  withInfo()(() => <Header />)
);

storiesOf('molecules/Header', module).add(
  'isLight',
  withInfo()(() => (
    <div className="bg-black relative" style={{ height: '100px' }}>
      <Header isLight />
    </div>
  ))
);
