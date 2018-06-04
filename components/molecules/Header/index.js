import generalStyles from './general.css';

import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import { Grid, GridItem } from '../../atoms/Grid';

export default function Header() {
  return (
    <header className={generalStyles.header}>
      <Heading size="xl" uppercase>
        header
      </Heading>
      <Grid>
        <GridItem columnSize={4}>yo</GridItem>
        <GridItem columnSize={4}>yo</GridItem>
        <GridItem columnSize={4}>yo</GridItem>
      </Grid>
    </header>
  );
}
