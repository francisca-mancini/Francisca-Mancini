import React, { PureComponent } from 'react';
import App from '../components/App';
import stickybits from 'stickybits';
import withData from '../lib/withData';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Heading from '../components/atoms/Heading';
import Button from '../components/atoms/Button';

import Basket from '../components/organisms/Basket';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

import MaxWidth from '../components/atoms/MaxWidth';

import Fragrances from '../components/organisms/shop/Fragrances';

import getProductsByType from '../lib/getProductsByType';
import { checkoutQuery, checkout } from '../lib/checkout';

class Shop extends PureComponent {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    const products = this.props.data.shop.products.edges;
    this.fragrances = getProductsByType(products, 'fragrance');
    this.layerings = getProductsByType(products, 'layering');
    this.discoveries = getProductsByType(products, 'discovery');
  }

  componentDidMount() {
    stickybits('.stickybits');
  }

  handleCheckout() {
    checkout(this);
  }

  render() {
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };

    return (
      <App>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <Fragrances products={this.fragrances} />

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
                        product={
                          this.layerings &&
                          this.layerings.length &&
                          this.layerings[0].node
                        }
                        height
                        isLayering
                        isSingle
                        isNoClick
                      />
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  <div
                    style={stickyStyle}
                    className="stickybits h-screen flex flex-col items-center justify-center"
                  >
                    <span className="absolute z-10 pin-t pin-l w-full pt-60 text-center">
                      <Heading size="s" weight="semilight" center>
                        Shop Layering Packs
                      </Heading>
                    </span>
                    <div className="w-100 pt-95 pb-140 flex flex-col items-center justify-center">
                      <ProductThumbnail
                        product={
                          this.layerings &&
                          this.layerings.length &&
                          this.layerings[0].node
                        }
                        height
                        isLayering
                        isNoClick
                        isSingle
                      />
                      <span className="absolute pin-b pin-l w-full pb-40 text-center">
                        <Button size="s">Shop Renaissance Layering Pack</Button>
                      </span>
                    </div>
                  </div>
                </GridItem>
                <GridItem columnSize={4}>
                  {this.layerings &&
                    this.layerings.length &&
                    this.layerings.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="pt-95 pb-140 h-screen flex items-center justify-center"
                        >
                          <ProductThumbnail
                            product={item.node}
                            height
                            isLayering
                            isNoClick
                            isSingle
                          />
                        </div>
                      );
                    })}
                </GridItem>
              </Grid>
            </Spacing>
          </Spacing>

          {this.discoveries &&
            this.discoveries.length && (
              <Spacing type="padding" size={80}>
                <Heading size="s" weight="semilight" center>
                  Shop Discovery Pack
                </Heading>

                <Spacing>
                  <MaxWidth center value={600}>
                    <ProductThumbnail
                      product={this.discoveries[0].node}
                      isDiscovery
                    />
                  </MaxWidth>
                </Spacing>
              </Spacing>
            )}
        </PageWrap>
      </App>
    );
  }
}

const query = gql`
  query query {
    shop {
      name
      description
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            productType
            tags
            images(first: 20) {
              edges {
                node {
                  altText
                  id
                  originalSrc
                  transformedSrc
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ShopWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Shop);

export default withData(ShopWithDataAndMutation);
