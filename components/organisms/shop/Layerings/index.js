import React from 'react';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import Heading from '../../../atoms/Heading';

import ProductThumbnail from '../../../molecules/ProductThumbnail';

import getProductHandle from '../../../../lib/getProductHandle';
import getProductImages from '../../../../lib/getProductImages';

export default function Fragrances({ products }) {
  return (
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
                <Heading size="s" weight="semilight" center>
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
            {products &&
              products.length &&
              products.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="pt-95 pb-140 h-screen flex items-center justify-center"
                  >
                    <ProductThumbnail product={item.node} height isLayering />
                  </div>
                );
              })}
          </GridItem>
        </Grid>
      </Spacing>
    </Spacing>
  );
}
