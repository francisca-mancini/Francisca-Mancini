import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import ProductThumbnail from '../../../molecules/ProductThumbnail';
import Heading from '../../../atoms/Heading';

export default function YouMightLike({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

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
              <MediaQuery minDeviceWidth={768}>
                <Grid gap={30}>
                  {products.map((item, index) => {
                    return (
                      <GridItem key={index} columnSize={4}>
                        <ProductThumbnail product={item.node} />
                      </GridItem>
                    );
                  })}
                </Grid>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={767}>
                <Slider {...settings}>
                  {products.map((item, index) => {
                    return <ProductThumbnail key={index} product={item.node} />;
                  })}
                </Slider>
              </MediaQuery>
            </Spacing>
          </Fragment>
        )}
    </Spacing>
  );
}
