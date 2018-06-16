import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';

import ProductThumbnail from '../components/molecules/ProductThumbnail';
import CollectionIntro from '../components/molecules/CollectionIntro';
import HeroVideo from '../components/molecules/HeroVideo';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';

function Home(data) {
  return (
    <App hasTopPad={false} headerLight>
      <HeroVideo />
      <PageWrap>
        <Spacing size={80} type="padding">
          <CollectionIntro />
        </Spacing>
        <Spacing size={80} type="padding">
          <Spacing position="b">
            <Heading tag="h3" size="xl" font="jenson" center>
              Shop Featured Products
            </Heading>
          </Spacing>
          <Spacing position="b" type="padding" size={80}>
            <Grid gap={[0, 70]}>
              <GridItem columnSize={[12, 6]}>
                <ProductThumbnail
                  color1={[107, 40, 84]}
                  color2={[128, 174, 232]}
                />
              </GridItem>
              <GridItem columnSize={[12, 6]}>
                <div style={{ transform: 'translateY(120px)' }}>
                  <ProductThumbnail
                    color1={[165, 200, 253]}
                    color2={[25, 67, 101]}
                  />
                </div>
              </GridItem>
            </Grid>
          </Spacing>
          <Spacing size={80}>
            <Grid gap={[0, 70]} justify="center">
              <GridItem columnSize={[12, 6]}>
                <ProductThumbnail
                  color1={[107, 40, 84]}
                  color2={[128, 174, 232]}
                />
              </GridItem>
            </Grid>
          </Spacing>
          <div className="text-center">
            <Button href="/products">View all Products</Button>
          </div>
        </Spacing>
      </PageWrap>
    </App>
  );
}

export default withData(Home);
