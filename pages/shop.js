import React, { PureComponent } from 'react';
import App from '../components/App';
import stickybits from 'stickybits';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Heading from '../components/atoms/Heading';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

export default class Shop extends PureComponent {
  componentDidMount() {
    stickybits('.stickybits');
  }

  render() {
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };

    return (
      <App>
        <PageWrap>
          <Spacing type="padding" size={80}>
            <Heading size="s" center>
              Shop Fragrances
            </Heading>
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
          <Spacing size={80}>
            <Heading size="s" center>
              Shop Layering Packs
            </Heading>

            <Spacing size={20}>
              <Grid align="stretch">
                <GridItem columnSize={4}>
                  <div style={stickyStyle} className="stickybits">
                    <Spacing type="padding" size={80}>
                      <ProductThumbnail
                        color1={[121, 66, 105]}
                        color2={[138, 173, 229]}
                      />
                    </Spacing>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div style={stickyStyle} className="stickybits">
                    <Spacing type="padding" size={80}>
                      <ProductThumbnail
                        color1={[255, 197, 237]}
                        color2={[191, 225, 255]}
                      />
                    </Spacing>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <Spacing size={80}>
                    <ProductThumbnail
                      color1={[255, 197, 237]}
                      color2={[191, 225, 255]}
                    />
                  </Spacing>
                  <Spacing size={80}>
                    <ProductThumbnail
                      color1={[255, 197, 237]}
                      color2={[191, 225, 255]}
                    />
                  </Spacing>
                  <Spacing size={80}>
                    <ProductThumbnail
                      color1={[255, 197, 237]}
                      color2={[191, 225, 255]}
                    />
                  </Spacing>
                  <Spacing size={80}>
                    <ProductThumbnail
                      color1={[255, 197, 237]}
                      color2={[191, 225, 255]}
                    />
                  </Spacing>
                </GridItem>
              </Grid>
            </Spacing>
          </Spacing>
        </PageWrap>
      </App>
    );
  }
}
