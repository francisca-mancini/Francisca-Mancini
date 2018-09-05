import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';

import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import ProductThumbnail from '../../../molecules/ProductThumbnail';
import Heading from '../../../atoms/Heading';
import getProductType from '../../../../lib/getProductType';
import getLayeringFragrance from '../../../../lib/getLayeringFragrance';

export default function YouMightLike({ products, voiles, productList }) {
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
                <Grid gap={30} justify="center">
                  {products.map((item, index) => {
                    const type = getProductType(item.node);
                    let dataProduct;

                    if (type === 'layering') {
                      dataProduct = getLayeringFragrance(productList, item.node)
                        ? getLayeringFragrance(productList, item.node).node
                        : item.node;
                    } else {
                      dataProduct = item.node;
                    }

                    return (
                      <GridItem key={index} columnSize={4}>
                        <ProductThumbnail
                          voiles={voiles}
                          isMultiple={type === 'layering' || false}
                          isLayering={type === 'layering' || false}
                          product={item.node}
                          dataProduct={dataProduct}
                        />
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
