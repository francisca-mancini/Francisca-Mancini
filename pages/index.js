import React, { PureComponent } from 'react';
import withData from '../lib/withData';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import MediaQuery from 'react-responsive';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';

import ProductThumbnail from '../components/molecules/ProductThumbnail';
import HeroVideo from '../components/molecules/HeroVideo';
import Loader from '../components/molecules/Loader';

import Basket from '../components/organisms/Basket';
import CollectionIntro from '../components/organisms/collection/CollectionIntro';

import getCollectionHome from '../lib/getCollectionHome';
import getProductsByType from '../lib/getProductsByType';

import { checkoutQuery, checkout } from '../lib/checkout';
import getProductsByVoile from '../lib/getProductsByVoile';
import getLayeringFragrance from '../lib/getLayeringFragrance';

class Home extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLoaded: true,
      secondTime: false
    };

    this.handleCheckout = this.handleCheckout.bind(this);
    this.onLoaderUpdate = this.onLoaderUpdate.bind(this);
  }

  componentWillMount() {
    const articles = this.props.data.shop.articles.edges;
    this.collection = getCollectionHome(articles, this.props.data);
    this.products = this.collection.products.edges;
    this.fragrance = getProductsByType(this.products, 'fragrance')[0];
    this.layering = getProductsByType(this.products, 'layering')[0];
    this.discovery = getProductsByType(this.products, 'discovery')[0];
    this.voiles = getProductsByVoile(this.products);

    this.dataProduct = getLayeringFragrance(
      this.products,
      this.layering.node
    ).node;
  }

  componentDidMount() {
    var firstTime = sessionStorage.getItem('hasLoadedAlready');

    if (!firstTime) {
      this.setState({ isLoaded: false, secondTime: false });
    } else {
      this.setState({ isLoaded: true, secondTime: true });
    }
  }

  onLoaderUpdate(isLoaded) {
    this.setState({ isLoaded });
  }

  handleCheckout() {
    checkout(this);
  }

  render() {
    const { isLoaded, secondTime } = this.state;
    const collectionProps = {
      style: {
        transition: '1.1s 0.5s cubic-bezier(0.770, 0, 0.175, 1.000)',
        opacity: isLoaded ? 1 : 0
      }
    };

    const products = this.collection.products.edges;

    return (
      <App hasTopPad={false} headerLight isHome isLoaded={isLoaded}>
        <Basket onCheckout={this.handleCheckout} />
        {!secondTime && <Loader onUpdate={this.onLoaderUpdate} />}
        <HeroVideo isPlaying={isLoaded} />
        <PageWrap>
          <div {...collectionProps}>
            <Spacing size={80} type="padding">
              <CollectionIntro isHome collection={this.collection} />
            </Spacing>
          </div>
          <Spacing size={80} type="padding">
            <Spacing position="b">
              <Heading tag="h3" size={['m', 'xxxl']} font="jenson" center>
                Shop Featured Products
              </Heading>
            </Spacing>
            <Spacing position="b" type="padding" size={80}>
              <Grid gap={[0, 70]}>
                <GridItem columnSize={[12, 6]}>
                  <ProductThumbnail product={this.fragrance.node} />
                </GridItem>
                <GridItem columnSize={[12, 6]}>
                  <MediaQuery minDeviceWidth={768}>
                    <div style={{ transform: 'translateY(120px)' }}>
                      <ProductThumbnail
                        isLayering
                        product={this.layering.node}
                        dataProduct={this.dataProduct}
                        voiles={this.voiles}
                        isMultiple
                      />
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={767}>
                    <Spacing size={[80, 80, 0]} position="t" type="padding">
                      <ProductThumbnail
                        isLayering
                        dataProduct={this.dataProduct}
                        product={this.layering.node}
                        voiles={this.voiles}
                        isMultiple
                      />
                    </Spacing>
                  </MediaQuery>
                </GridItem>
              </Grid>
            </Spacing>
            <Spacing size={[30, 30, 80]} type="padding">
              <Grid gap={[0, 70]} justify="center">
                <GridItem columnSize={[12, 7]}>
                  <ProductThumbnail isDiscovery product={this.discovery.node} />
                </GridItem>
              </Grid>
            </Spacing>
            <div className="text-center">
              <Button href="/shop">View all Products</Button>
            </div>
          </Spacing>
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
      articles(first: 20) {
        edges {
          node {
            content
          }
        }
      }
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
    }
  }
`;

const HomeWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Home);

export default withData(HomeWithDataAndMutation);
