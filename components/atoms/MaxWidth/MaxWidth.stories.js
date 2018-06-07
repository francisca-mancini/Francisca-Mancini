import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import MaxWidth from './index';

storiesOf('atoms/MaxWidth', module).add(
  'default',
  withInfo()(() => (
    <MaxWidth value={500}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi aut ex
      natus neque vero odit, quidem harum possimus voluptates, adipisci aliquid
      exercitationem magnam beatae nulla incidunt id vitae quos facere!
    </MaxWidth>
  ))
);

storiesOf('atoms/MaxWidth', module).add(
  'center',
  withInfo()(() => (
    <MaxWidth value={500} center>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi aut ex
      natus neque vero odit, quidem harum possimus voluptates, adipisci aliquid
      exercitationem magnam beatae nulla incidunt id vitae quos facere!
    </MaxWidth>
  ))
);
