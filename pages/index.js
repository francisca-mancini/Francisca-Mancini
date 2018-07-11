import React, { PureComponent } from 'react';
import withData from '../lib/withData';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import { Grid, GridItem } from '../components/atoms/Grid';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';

import ProductThumbnail from '../components/molecules/ProductThumbnail';
import HeroVideo from '../components/molecules/HeroVideo';
import Loader from '../components/molecules/Loader';

import CollectionIntro from '../components/organisms/collection/CollectionIntro';

import getCollectionHome from '../lib/getCollectionHome';

class Home extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLoaded: true,
      secondTime: false
    };

    this.onLoaderUpdate = this.onLoaderUpdate.bind(this);
  }

  componentWillMount() {
    const articles = this.props.data.shop.articles.edges;
    this.collection = getCollectionHome(articles, this.props.data);
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

  render() {
    const { isLoaded, secondTime } = this.state;
    const collectionProps = {
      style: {
        transition: '1.1s 0.5s cubic-bezier(0.770, 0, 0.175, 1.000)',
        opacity: isLoaded ? 1 : 0
      }
    };

    return (
      <App hasTopPad={false} headerLight isHome isLoaded={isLoaded}>
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
              <Heading tag="h3" size="xl" font="jenson" center>
                Shop Featured Products
              </Heading>
            </Spacing>
            <Spacing position="b" type="padding" size={80}>
              <Grid gap={[0, 70]}>
                <GridItem columnSize={[12, 6]}>
                  <ProductThumbnail color1="#E88F56" color2="#AC1620" />
                </GridItem>
                <GridItem columnSize={[12, 6]}>
                  <div style={{ transform: 'translateY(120px)' }}>
                    <ProductThumbnail color1="#E1C68F" color2="#C5729F" />
                  </div>
                </GridItem>
              </Grid>
            </Spacing>
            <Spacing size={80}>
              <Grid gap={[0, 70]} justify="center">
                <GridItem columnSize={[12, 6]}>
                  <ProductThumbnail color1="#3B3E41" color2="#CEE4FF" />
                </GridItem>
              </Grid>
            </Spacing>
            <div className="text-center">
              <Button href="/products">View all Products</Button>
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default withData(graphql(query)(Home));
