import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Paragraph from './index';

storiesOf('atoms/Paragraph', module).add(
  'default',
  withInfo()(() => <Paragraph>I'm a Paragraph</Paragraph>)
);

storiesOf('atoms/Paragraph', module).add(
  'size',
  withInfo()(() => <Paragraph size="xl">I'm a Paragraph</Paragraph>)
);

storiesOf('atoms/Paragraph', module).add(
  'center',
  withInfo()(() => <Paragraph center>I'm a Paragraph</Paragraph>)
);

storiesOf('atoms/Paragraph', module).add(
  'color',
  withInfo()(() => <Paragraph color="red">I'm a Paragraph</Paragraph>)
);
