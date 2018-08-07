import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
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
import withData from '../lib/withData';

class Product extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { productHandle: handle };
  }

  componentWillMount() {
    this.product = getProduct(this.props.data, this.props.productHandle);
    this.products = getProductsButHandle(
      this.props.data.shop.products.edges,
      getProductHandle(this.product)
    );

    if (!this.product) {
      this.props.url.push('/404');
    }
  }

  render() {
    if (!this.product) {
      return <div />;
    }

    const mightLikeProducts = this.products.slice(0, 3);

    return (
      <App hasTopPad={false} hasBottomPad={false}>
        <Basket />
        <PageWrap>
          <Hero product={this.product} />
        </PageWrap>
        <div className="relative z-20 bg-white">
          <Story product={this.product} />
          <PageWrap>
            <YouMightLike products={mightLikeProducts} />
          </PageWrap>
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

export default withData(graphql(query)(Product));
