import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import ProductThumbnail from '../../../molecules/ProductThumbnail';

export default function YouMightLike() {
  return (
    <Spacing size={80}>
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
