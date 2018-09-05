import React, { PureComponent, Fragment } from 'react';
import App from '../components/App';
import stickybits from 'stickybits';
import withData from '../lib/withData';
import { graphql, compose } from 'react-apollo';
import MediaQuery from 'react-responsive';
import gql from 'graphql-tag';
import Observer from 'react-intersection-observer';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Heading from '../components/atoms/Heading';

import Basket from '../components/organisms/Basket';

import ProductThumbnail from '../components/molecules/ProductThumbnail';

import MaxWidth from '../components/atoms/MaxWidth';

import Fragrances from '../components/organisms/shop/Fragrances';

import getProductsByType from '../lib/getProductsByType';
import getProductsByVoile from '../lib/getProductsByVoile';
import { checkoutQuery, checkout } from '../lib/checkout';
import Layerings from '../components/organisms/shop/Layerings';
import getProductHandle from '../lib/getProductHandle';
import getProductTitle from '../lib/getProductTitle';
import getProductPrice from '../lib/getProductPrice';
import getProductType from '../lib/getProductType';

class Shop extends PureComponent {
  constructor() {
    super();

    this.state = {
      activeIndex: 0
    };

    this.handleCheckout = this.handleCheckout.bind(this);

    this.threshold = 0.3;
  }

  componentWillMount() {
    const products = this.props.data.shop.products.edges;
    this.fragrances = getProductsByType(products, 'fragrance');
    this.layerings = getProductsByType(products, 'layering');
    this.discoveries = getProductsByType(products, 'discovery');
    this.voiles = getProductsByVoile(products);
  }

  componentDidMount() {
    stickybits('.stickybits');

    if (window.innerWidth >= 768) {
      this.threshold = 0.5;
    } else {
      this.threshold = 0.3;
    }
  }

  handleCheckout() {
    checkout(this);
  }

  handleIntersection(inView, index) {
    if (inView) {
      this.setState({
        activeIndex: index
      });
    }
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <App>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <div id="fragrances">
            <Fragrances products={this.fragrances} />
          </div>

          <Spacing size={80}>
            <div id="layerings">
              <Spacing size={20}>
                <Grid align="stretch" gap={0}>
                  <Layerings
                    product1={this.voiles[0] && this.voiles[0].node}
                    product2={this.voiles[1] && this.voiles[1].node}
                    href={`/product/${getProductHandle(
                      this.layerings[activeIndex].node
                    )}`}
                    title={getProductTitle(this.layerings[activeIndex].node)}
                    price={getProductPrice(this.layerings[activeIndex].node)}
                  />
                  <GridItem columnSize={[12, 12, 4]}>
                    <MediaQuery maxDeviceWidth={767}>
                      <Heading size="s" weight="semilight" center>
                        Shop Layering Packs
                      </Heading>
                    </MediaQuery>
                    {this.layerings &&
                      this.layerings.length &&
                      this.layerings.map((item, index) => {
                        return (
                          <Observer
                            onChange={inView => {
                              this.handleIntersection(inView, index);
                            }}
                            threshold={this.threshold}
                          >
                            <MediaQuery minDeviceWidth={768}>
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
                                  isNoPrice
                                />
                              </div>
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={767}>
                              <Spacing size={100}>
                                <ProductThumbnail
                                  product={item.node}
                                  voiles={this.voiles}
                                  isLayering
                                  isMultiple
                                />
                              </Spacing>
                            </MediaQuery>
                          </Observer>
                        );
                      })}
                  </GridItem>
                </Grid>
              </Spacing>
            </div>
          </Spacing>

          <div id="discovery">
            {this.discoveries &&
              this.discoveries.length && (
                <Spacing type="padding" size={[0, 0, 80]}>
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
          </div>
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
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
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
