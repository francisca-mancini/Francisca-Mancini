import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Heading from './index';

storiesOf('molecules/Heading', module).add(
  'default',
  withInfo()(() => <Heading>I'm a heading</Heading>)
);

storiesOf('molecules/Heading', module).add(
  'size',
  withInfo()(() => <Heading size="xl">I'm a heading</Heading>)
);

storiesOf('molecules/Heading', module).add(
  'center',
  withInfo()(() => <Heading center>I'm a heading</Heading>)
);

storiesOf('molecules/Heading', module).add(
  'uppercase',
  withInfo()(() => <Heading uppercase>I'm a heading</Heading>)
);

storiesOf('molecules/Heading', module).add(
  'color',
  withInfo()(() => <Heading color="red">I'm a heading</Heading>)
);