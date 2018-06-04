import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Grid, GridItem } from './index';

storiesOf('atoms/Grid', module).add(
  'default',
  withInfo()(() => (
    <Grid>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 1</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 2</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 3</div>
      </GridItem>
    </Grid>
  ))
);

storiesOf('atoms/Grid', module).add(
  'gap',
  withInfo()(() => (
    <Grid gap={['0', '1', '2']}>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 1</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 2</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 3</div>
      </GridItem>
    </Grid>
  ))
);

storiesOf('atoms/Grid', module).add(
  'row',
  withInfo()(() => (
    <Grid row="flex-row-reverse">
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 1</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 2</div>
      </GridItem>
      <GridItem columnSize={[6, 2]}>
        <div className="p-3 border-1 border-solid">Grid Item 3</div>
      </GridItem>
    </Grid>
  ))
);
