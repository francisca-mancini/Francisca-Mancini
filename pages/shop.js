import React, { PureComponent } from 'react';
import App from '../components/App';
import stickybits from 'stickybits';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Heading from '../components/atoms/Heading';
import Button from '../components/atoms/Button';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

import layeringImage from '../static/images/_temp/product3.png';
import layeringImage2 from '../static/images/_temp/product3-alt.png';
import layeringImage3 from '../static/images/_temp/product3-alt-2.png';

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
            <Spacing size={20}>
              <Grid align="stretch" gap={0}>
                <GridItem columnSize={4}>
                  <div
                    style={stickyStyle}
                    className="stickybits h-screen flex flex-col items-center justify-center"
                  >
                    <div className="flex w-100 items-center justify-center">
                      <ProductThumbnail
                        image={layeringImage}
                        color1={[121, 66, 105]}
                        color2={[138, 173, 229]}
                      />
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div
                    style={stickyStyle}
                    className="stickybits h-screen flex flex-col items-center justify-center"
                  >
                    <span className="absolute pin-t pin-l w-full pt-40 text-center">
                      <Heading size="s" center>
                        Shop Layering Packs
                      </Heading>
                    </span>
                    <div className="w-100 h-80 flex flex-col items-center justify-center">
                      <ProductThumbnail
                        image={layeringImage2}
                        color1={[255, 197, 237]}
                        color2={[191, 225, 255]}
                      />
                      <span className="absolute pin-b pin-l w-full pb-40 text-center">
                        <Button size="s">Shop Renaissance Layering Pack</Button>
                      </span>
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div className="h-90screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1={[176, 29, 35]}
                      color2={[233, 137, 77]}
                    />
                  </div>
                  <div className="h-90screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1={[57, 96, 127]}
                      color2={[166, 201, 161]}
                    />
                  </div>
                  <div className="h-90screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1={[66, 66, 77]}
                      color2={[197, 217, 242]}
                    />
                  </div>
                  <div className="h-90screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1={[199, 111, 159]}
                      color2={[243, 215, 128]}
                    />
                  </div>
                </GridItem>
              </Grid>
            </Spacing>
          </Spacing>
        </PageWrap>
      </App>
    );
  }
}
