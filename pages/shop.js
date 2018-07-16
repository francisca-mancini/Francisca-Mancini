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
import MaxWidth from '../components/atoms/MaxWidth';

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
                  <ProductThumbnail color1="#E88F56" color2="#AC1620" />
                </Spacing>
              </GridItem>
              <GridItem columnSize={[12, 6, 4]}>
                <div style={{ transform: 'translateY(120px)' }}>
                  <Spacing size={70}>
                    <ProductThumbnail color1="#E1C68F" color2="#C5729F" />
                  </Spacing>
                </div>
              </GridItem>
              <GridItem columnSize={[12, 6, 4]}>
                <Spacing size={70}>
                  <ProductThumbnail color1="#3B3E41" color2="#CEE4FF" />
                </Spacing>
              </GridItem>
              <GridItem columnSize={[12, 6, 4]}>
                <Spacing size={70}>
                  <ProductThumbnail color1="#A5C899" color2="#194365" />
                </Spacing>
              </GridItem>
              <GridItem columnSize={[12, 6, 4]}>
                <div style={{ transform: 'translateY(120px)' }}>
                  <Spacing size={70}>
                    <ProductThumbnail color1="#E88F56" color2="#AC1620" />
                  </Spacing>
                </div>
              </GridItem>
              <GridItem columnSize={[12, 6, 4]}>
                <Spacing size={70}>
                  <ProductThumbnail color1="#3B3E41" color2="#CEE4FF" />
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
                    <div className="pt-95 pb-120 flex w-100 items-center justify-center">
                      <ProductThumbnail
                        image={layeringImage}
                        color1="#6B2854"
                        color2="#80AEE8"
                        height
                        isLayering
                      />
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div
                    style={stickyStyle}
                    className="stickybits h-screen flex flex-col items-center justify-center"
                  >
                    <span className="absolute z-10 pin-t pin-l w-full pt-40 text-center">
                      <Heading size="s" center>
                        Shop Layering Packs
                      </Heading>
                    </span>
                    <div className="w-100 pt-95 pb-140 flex flex-col items-center justify-center">
                      <ProductThumbnail
                        image={layeringImage2}
                        color1="#FFC5E9"
                        color2="#BEE0FF"
                        height
                        isLayering
                      />
                      <span className="absolute pin-b pin-l w-full pb-40 text-center">
                        <Button size="s">Shop Renaissance Layering Pack</Button>
                      </span>
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div className="pt-95 pb-140 h-screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1="#6B2854"
                      color2="#80AEE8"
                      height
                      isLayering
                    />
                  </div>
                  <div className="pt-95 pb-140 h-screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1="#3B3E41"
                      color2="#CEE4FF"
                      height
                      isLayering
                    />
                  </div>
                  <div className="pt-95 pb-140 h-screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1="#E1C68F"
                      color2="#C5729F"
                      height
                      isLayering
                    />
                  </div>
                  <div className="pt-95 pb-140 h-screen flex items-center justify-center">
                    <ProductThumbnail
                      image={layeringImage3}
                      color1="#6B2854"
                      color2="#80AEE8"
                      height
                      isLayering
                    />
                  </div>
                </GridItem>
              </Grid>
            </Spacing>
          </Spacing>

          <Spacing type="padding" size={80}>
            <Heading size="s" center>
              Shop Discovery Pack
            </Heading>

            <Spacing>
              <MaxWidth center value={700}>
                <ProductThumbnail isDiscovery />
              </MaxWidth>
            </Spacing>
          </Spacing>
        </PageWrap>
      </App>
    );
  }
}
