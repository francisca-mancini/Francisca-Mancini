import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import ProductThumbnail from '../../../molecules/ProductThumbnail';
import Heading from '../../../atoms/Heading';

export default function YouMightLike() {
  return (
    <Spacing size={80} type="padding">
      <Spacing size={60} position="b" type="padding">
        <Heading size="s" center>
          You might like
        </Heading>
      </Spacing>
      <Grid gap={30}>
        <GridItem columnSize={4}>
          <ProductThumbnail />
        </GridItem>
        <GridItem columnSize={4}>
          <ProductThumbnail />
        </GridItem>
        <GridItem columnSize={4}>
          <ProductThumbnail />
        </GridItem>
      </Grid>
    </Spacing>
  );
}
