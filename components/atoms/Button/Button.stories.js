import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Button from './index';

storiesOf('atoms/Button', module).add(
  'default',
  withInfo()(() => <Button>I'm a Button</Button>)
);

storiesOf('atoms/Button', module).add(
  'size',
  withInfo()(() => <Button size="s">I'm a Button</Button>)
);
