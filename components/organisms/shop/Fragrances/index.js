import React from 'react';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import Heading from '../../../atoms/Heading';

import ProductThumbnail from '../../../molecules/ProductThumbnail';

import getProductHandle from '../../../../lib/getProductHandle';
import getProductImages from '../../../../lib/getProductImages';

export default function Fragrances({ products }) {
  return (
    <Spacing type="padding" size={80}>
      <Heading size="s" center>
        Shop Fragrances
      </Heading>
      <Grid gap={[0, 30]}>
        {products &&
          products.length &&
          products.map((item, index) => {
            const product = item.node;
            const y = index % 2 === 0 ? 120 : 0;

            return (
              <GridItem key={index} columnSize={[12, 6, 4]}>
                <div style={{ transform: `translateY(${y}px)` }}>
                  <Spacing size={70}>
                    <ProductThumbnail product={product} />
                  </Spacing>
                </div>
              </GridItem>
            );
          })}
      </Grid>
    </Spacing>
  );
}
