import React, { PureComponent } from 'react';
import stickybits from 'stickybits';
import classNames from 'classnames';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Grid, GridItem } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';
import Spacing from '../../../atoms/Spacing';

import LearnMore from '../../../molecules/LearnMore';

import getProduct from '../../../../lib/getProduct';
import getProductImages from '../../../../lib/getProductImages';
import getProductTitle from '../../../../lib/getProductTitle';
import getProductType from '../../../../lib/getProductType';
import getProductPrice from '../../../../lib/getProductPrice';
import getProductDescription from '../../../../lib/getProductDescription';

import generalStyles from './hero.module.css';

class Hero extends PureComponent {
  constructor() {
    super();

    this.product = null;
  }

  componentDidMount() {
    stickybits('.stickybits');

    this.product = getProduct(this.props.data, 'product-numer-1');
  }

  render() {
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };
    const images = this.product && getProductImages(this.product);
    const title = this.product && getProductTitle(this.product);
    const type = this.product && getProductType(this.product);
    const price = this.product && getProductPrice(this.product);
    const description = this.product && getProductDescription(this.product);

    return (
      <Grid gap={30} align="stretch">
        <GridItem columnSize={4}>
          <div
            style={stickyStyle}
            className={classNames('stickybits', generalStyles.left)}
          >
            <Paragraph weight="semilight" center size="s">
              Is a highly spiritual scent, with Frankincense, incense, musks,
              and fire, that can be found after a trip across the north of
              Africa, from the High Atlas to the Nile.
            </Paragraph>
            <div className={generalStyles.footerLeft}>
              <Paragraph size="s">
                Collection N°1 Maps, Travel • Fragrances • Atlantica
              </Paragraph>
            </div>
            <div className={generalStyles.learnMore}>
              <LearnMore>Learn more</LearnMore>
            </div>
          </div>
        </GridItem>
        <GridItem columnSize={4}>
          {images &&
            images.length &&
            images.map((item, index) => {
              return (
                <div key={index} className={generalStyles.imageContainer}>
                  <img src={item.src} alt="" />
                </div>
              );
            })}
        </GridItem>
        <GridItem columnSize={4}>
          <div
            style={stickyStyle}
            className={classNames('stickybits', generalStyles.right)}
          >
            <Heading uppercase size="m" font="serif">
              {title}
            </Heading>
            <Spacing size={25}>
              <Paragraph size="s">
                {type} - £{price}
              </Paragraph>
            </Spacing>
            <Button size="s">
              <span className="font-normal">Add to bag</span>
            </Button>
            <div className={generalStyles.footerRight}>
              <Paragraph size="s">Free shipping above £100</Paragraph>
            </div>
          </div>
        </GridItem>
      </Grid>
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

const AppWithDataAndMutation = compose(graphql(query))(Hero);

export default AppWithDataAndMutation;
