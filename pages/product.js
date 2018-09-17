import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';

import Basket from '../components/organisms/Basket';
import Hero from '../components/organisms/product/Hero';
import YouMightLike from '../components/organisms/product/YouMightLike';
import Story from '../components/organisms/product/Story';

import getProduct from '../lib/getProduct';
import getProductHandle from '../lib/getProductHandle';
import getProductsButHandle from '../lib/getProductsButHandle';
import getProductRelated from '../lib/getProductRelated';
import getProductsByVoile from '../lib/getProductsByVoile';
import withData from '../lib/withData';

import { checkoutQuery, checkout } from '../lib/checkout';
import getProductType from '../lib/getProductType';
import getLayeringFragrance from '../lib/getLayeringFragrance';

class Product extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { productHandle: handle };
  }

  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    this.product = getProduct(this.props.data, this.props.productHandle);

    if (!this.product) {
      this.props.url.push('/404');
    }

    this.products = getProductsButHandle(
      this.props.data.shop.products.edges,
      getProductHandle(this.product)
    );
    this.type = getProductType(this.product);
    this.voiles = getProductsByVoile(this.products);

    if (this.type === 'layering') {
      this.dataProduct = getLayeringFragrance(this.products, this.product).node;
    } else {
      this.dataProduct = this.product;
    }

    this.relatedProducts = getProductRelated(
      this.product,
      this.products,
      this.props.data
    );
  }

  handleCheckout() {
    checkout(this);
  }

  render() {
    if (!this.product) {
      return <div />;
    }

    return (
      <App hasTopPad={false} hasBottomPad={false}>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <Hero product={this.product} dataProduct={this.dataProduct} />
        </PageWrap>
        <div className="relative z-20 bg-white">
          <Story product={this.product} dataProduct={this.dataProduct} />
          {this.relatedProducts &&
            this.relatedProducts.length && (
              <PageWrap>
                <YouMightLike
                  voiles={this.voiles}
                  products={this.relatedProducts}
                  productList={this.props.data.shop.products.edges}
                />
              </PageWrap>
            )}
        </div>
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
            products(first: 20) {
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
      }
      products(first: 20) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            options {
              id
              name
              values
            }
            productType
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            collections(first: 10) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  handle
                  title
                }
              }
            }
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
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

const ProductWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Product);

export default withData(ProductWithDataAndMutation);
