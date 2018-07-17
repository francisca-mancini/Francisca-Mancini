import React, { Fragment } from 'react';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import ProductThumbnail from '../../../molecules/ProductThumbnail';
import Heading from '../../../atoms/Heading';

export default function YouMightLike({ products }) {
  return (
    <Spacing size={80} type="padding">
      {products &&
        products.length && (
          <Fragment>
            <Spacing size={60} position="b" type="padding">
              <Heading size="s" center>
                You might like
              </Heading>
            </Spacing>
            <Spacing size={80} position="b" type="padding">
              <Grid gap={30}>
                {products.map((item, index) => {
                  return (
                    <GridItem key={index} columnSize={4}>
                      <ProductThumbnail product={item.node} />
                    </GridItem>
                  );
                })}
              </Grid>
            </Spacing>
          </Fragment>
        )}
    </Spacing>
  );
}
