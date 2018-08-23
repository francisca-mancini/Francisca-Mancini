import React from 'react';
import MediaQuery from 'react-responsive';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import Heading from '../../../atoms/Heading';

import ProductThumbnail from '../../../molecules/ProductThumbnail';

export default function Fragrances({ products }) {
  return (
    <Spacing type="padding" size={40}>
      <Heading size="s" weight="semilight" center>
        Shop Fragrances
      </Heading>
      <Grid gap={0}>
        {products &&
          products.length &&
          products.map((item, index) => {
            const product = item.node;
            const y = index % 3 === 1 ? 60 : 0;

            return (
              <GridItem key={index} columnSize={[12, 6, 4]}>
                <MediaQuery minDeviceWidth={768}>
                  <div style={{ transform: `translateY(${y}px)` }}>
                    <Spacing size={50}>
                      <ProductThumbnail product={product} />
                    </Spacing>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={767}>
                  <Spacing size={50}>
                    <ProductThumbnail product={product} />
                  </Spacing>
                </MediaQuery>
              </GridItem>
            );
          })}
      </Grid>
    </Spacing>
  );
}
