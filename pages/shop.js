import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

export default function Shop() {
  return (
    <App>
      <PageWrap>
        <Spacing position="b" type="padding" size={80}>
          <Grid gap={[0, 30]}>
            <GridItem columnSize={[12, 6, 4]}>
              <Spacing size={70}>
                <ProductThumbnail
                  color1={[182, 33, 35]}
                  color2={[229, 139, 89]}
                />
              </Spacing>
            </GridItem>
            <GridItem columnSize={[12, 6, 4]}>
              <div style={{ transform: 'translateY(120px)' }}>
                <Spacing size={70}>
                  <ProductThumbnail
                    color1={[64, 98, 126]}
                    color2={[167, 198, 164]}
                  />
                </Spacing>
              </div>
            </GridItem>
            <GridItem columnSize={[12, 6, 4]}>
              <Spacing size={70}>
                <ProductThumbnail
                  color1={[198, 117, 158]}
                  color2={[229, 193, 141]}
                />
              </Spacing>
            </GridItem>
            <GridItem columnSize={[12, 6, 4]}>
              <Spacing size={70}>
                <ProductThumbnail
                  color1={[70, 73, 78]}
                  color2={[199, 220, 247]}
                />
              </Spacing>
            </GridItem>
            <GridItem columnSize={[12, 6, 4]}>
              <div style={{ transform: 'translateY(120px)' }}>
                <Spacing size={70}>
                  <ProductThumbnail
                    color1={[255, 197, 237]}
                    color2={[191, 225, 255]}
                  />
                </Spacing>
              </div>
            </GridItem>
            <GridItem columnSize={[12, 6, 4]}>
              <Spacing size={70}>
                <ProductThumbnail
                  color1={[121, 66, 105]}
                  color2={[138, 173, 229]}
                />
              </Spacing>
            </GridItem>
          </Grid>
        </Spacing>
      </PageWrap>
    </App>
  );
}
