import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

import Shop from '../components/molecules/Shop';

function Home(data) {
  return (
    <App>
      <PageWrap>
        <div>home</div>
        <Spacing>
          <Grid gap={[0, 70]}>
            <GridItem columnSize={[12, 6]}>
              <ProductThumbnail />
            </GridItem>
            <GridItem columnSize={[12, 6]}>
              <ProductThumbnail />
            </GridItem>
          </Grid>
        </Spacing>
      </PageWrap>
    </App>
  );
}

export default withData(Home);
