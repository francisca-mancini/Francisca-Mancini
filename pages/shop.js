import React, { PureComponent, Fragment } from 'react';
import App from '../components/App';
import stickybits from 'stickybits';
import withData from '../lib/withData';
import { graphql, compose } from 'react-apollo';
import MediaQuery from 'react-responsive';
import gql from 'graphql-tag';
import Observer from 'react-intersection-observer';
import Scroll, { Element, scroller } from 'react-scroll';

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
import getLayeringFragrance from '../lib/getLayeringFragrance';
import getProductVariantType from '../lib/getProductVariantType';

class Shop extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { handle: handle };
  }

  constructor() {
    super();

    this.state = {
      activeIndex: 0
    };

    this.handleCheckout = this.handleCheckout.bind(this);

    this.threshold = 0.3;
  }

  componentWillMount() {
    this.products = this.props.data.shop.products.edges;
    this.fragrances = getProductsByType(this.products, 'fragrance');
    this.layerings = getProductsByType(this.products, 'layering');
    this.discoveries = getProductsByType(this.products, 'discovery');
    this.voiles = getProductsByVoile(this.products);

    this.fragranceType = getProductVariantType(this.fragrances[0].node);
    this.layeringType = getProductVariantType(this.layerings[0].node);
    this.discoveryType = getProductVariantType(this.discoveries[0].node);
  }

  componentDidMount() {
    const { handle } = this.props;

    stickybits('.stickybits');

    if (handle) {
      scroller.scrollTo(handle, {
        duration: 300,
        delay: 100,
        smooth: true,
        offset: -100
      });
    }

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
      <App collections={this.props.data.shop.collections}>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <Element name="fragrances">
            <Fragrances
              fragranceType={this.fragranceType}
              products={this.fragrances}
            />
          </Element>

          <Spacing size={80}>
            <Element name="layerings">
              <Spacing size={20}>
                <Grid align="stretch" gap={0}>
                  <Layerings
                    layeringType={this.layeringType}
                    product1={this.voiles[0] && this.voiles[0].node}
                    product2={this.voiles[1] && this.voiles[1].node}
                    href={`/product/${getProductHandle(
                      this.layerings[activeIndex].node
                    )}`}
                    title={getProductTitle(this.layerings[activeIndex].node)}
                    price={getProductPrice(this.layerings[activeIndex].node)}
                  />
                  <GridItem columnSize={[12, 12, 4]}>
                    <Heading
                      className="md-hidden"
                      size="s"
                      weight="semilight"
                      center
                    >
                      Shop {this.layeringType}
                    </Heading>
                    {this.layerings &&
                      this.layerings.length &&
                      this.layerings.map((item, index) => {
                        const dataProduct = getLayeringFragrance(
                          this.products,
                          item.node
                        );

                        return (
                          <Observer
                            key={index}
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
                                  dataProduct={dataProduct.node}
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
                                  dataProduct={dataProduct.node}
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
            </Element>
          </Spacing>

          <Element name="discovery">
            {this.discoveries &&
              this.discoveries.length && (
                <Spacing type="padding" size={[0, 0, 80]}>
                  <Heading size="s" weight="semilight" center>
                    Shop {this.discoveryType}
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
          </Element>
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
      collections(first: 20) {
        edges {
          node {
            handle
            id
            description
            descriptionHtml
            title
          }
        }
      }
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
            variants(first: 20) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
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
