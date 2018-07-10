import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import App from '../components/App';
import withData from '../lib/withData';

import PageWrap from '../components/atoms/PageWrap';

import Hero from '../components/organisms/product/Hero';
import YouMightLike from '../components/organisms/product/YouMightLike';
import Story from '../components/organisms/product/Story';

import getProduct from '../lib/getProduct';

class Product extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { productHandle: handle };
  }

  componentWillMount() {
    this.product = getProduct(this.props.data, this.props.productHandle);

    if (!this.product) {
      this.props.url.push('/404');
    }
  }

  render() {
    if (!this.product) {
      return <div />;
    }

    return (
      <App hasTopPad={false}>
        <PageWrap>
          <Hero product={this.product} />
        </PageWrap>
        <Story product={this.product} />
        <PageWrap>
          <YouMightLike />
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
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
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
