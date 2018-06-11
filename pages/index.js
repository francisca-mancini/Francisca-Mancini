import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';

import ProductThumbnail from '../components/molecules/ProductThumbnail';
import CollectionIntro from '../components/molecules/CollectionIntro';
import HeroVideo from '../components/molecules/HeroVideo';

function Home(data) {
  return (
    <App hasTopPad={false} headerLight>
      <HeroVideo />
      <PageWrap>
        <Spacing size={80} type="padding">
          <CollectionIntro />
        </Spacing>
        <Spacing size={80} type="padding">
          <Grid gap={[0, 70]}>
            <GridItem columnSize={[12, 6]}>
              <ProductThumbnail
                color1={[107, 40, 84]}
                color2={[128, 174, 232]}
              />
            </GridItem>
            <GridItem columnSize={[12, 6]}>
              <ProductThumbnail
                color1={[165, 200, 253]}
                color2={[25, 67, 101]}
              />
            </GridItem>
          </Grid>
        </Spacing>
      </PageWrap>
    </App>
  );
}

export default withData(Home);
