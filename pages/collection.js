import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import App from '../components/App';
import stickybits from 'stickybits';
import classNames from 'classnames';
import { Link } from 'react-scroll';

import { Grid, GridItem } from '../components/atoms/Grid';
import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import Heading from '../components/atoms/Heading';
import Button from '../components/atoms/Button';
import AtomLink from '../components/atoms/Link';

import HeroVideo from '../components/molecules/HeroVideo';

import Basket from '../components/organisms/Basket';
import CollectionIntro from '../components/organisms/collection/CollectionIntro';
import Fragrance from '../components/organisms/collection/Fragrance';

import withData from '../lib/withData';
import getCollection from '../lib/getCollection';
import getProductTitle from '../lib/getProductTitle';
import getProductHandle from '../lib/getProductHandle';
import getProductDescription from '../lib/getProductDescription';
import getProductBackground from '../lib/getProductBackground';
import getProductCollectionImages from '../lib/getProductCollectionImages';
import getProductLayeringHandle from '../lib/getProductLayeringHandle';
import getProductGradient from '../lib/getProductGradient';
import getCollectionDescription from '../lib/getCollectionDescription';

import { checkoutQuery, checkout } from '../lib/checkout';
import getProductStory from '../lib/getProductStory';
import getProductVariantType from '../lib/getProductVariantType';
import getProductLayering from '../lib/getProductLayering';
import getCollectionVideo from '../lib/getCollectionVideo';

class Collection extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { collectionHandle: handle };
  }

  constructor() {
    super();

    this.state = { index: 0, firstOut: true };
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    this.collection = getCollection(
      this.props.data,
      this.props.collectionHandle
    );

    if (!this.collection) {
      this.props.url.push('/404');
    }

    this.video = getCollectionVideo(this.collection);
    this.getProducts();
  }

  componentDidMount() {
    stickybits('.stickybits');
  }

  handleNewIndex(index) {
    this.setState({
      index
    });
  }

  handleFirstOut(bool) {
    this.setState({
      firstOut: bool
    });
  }

  handleCheckout() {
    checkout(this);
  }

  getProducts() {
    this.products = [];

    this.collection.products.edges.forEach(item => {
      const product = item.node;

      if (product.productType === 'fragrance') {
        const layering = getProductLayering(
          this.collection.products.edges,
          product
        );

        this.products.push({
          title: getProductTitle(product),
          handle: getProductHandle(product),
          description: getProductDescription(product),
          story: getProductStory(product),
          bgColor: getProductBackground(product),
          images: getProductCollectionImages(product),
          color1: getProductGradient(product).color1,
          color2: getProductGradient(product).color2,
          desc: getCollectionDescription(product),
          type: layering ? getProductVariantType(layering.node) : '',
          layeringHandle: getProductLayeringHandle(
            this.collection.products,
            product
          )
        });
      }
    });
  }

  render() {
    const { index, firstOut } = this.state;
    const dataItem = this.products[index];
    const containerStyle = {
      backgroundColor: firstOut ? 'white' : dataItem.bgColor,
      transition: '0.8s ease-in-out'
    };
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };

    if (!this.collection) {
      return <div />;
    }

    return (
      <App hasTopPad={false} hasBottomPad={false} headerLight isHome>
        <Basket onCheckout={this.handleCheckout} />
        <HeroVideo src={this.video.url} poster={this.video.image} />
        <div style={containerStyle}>
          <Spacing size={80} type="padding" position="b">
            <PageWrap>
              <Spacing size={80} type="padding">
                <CollectionIntro collection={this.collection} to="fragrances" />
              </Spacing>
            </PageWrap>
          </Spacing>
        </div>

        <div style={containerStyle} id="fragrances">
          <PageWrap>
            <Grid gap={[0, 0, 20]} align="stretch">
              <GridItem columnSize={[0, 0, 2]}>
                <div
                  className="stickybits flex-col h-screen justify-center hidden md-flex"
                  style={stickyStyle}
                >
                  {this.products.map((item, i) => {
                    const itemClassName = classNames({
                      'opacity-100': i === index,
                      'opacity-50': i !== index
                    });

                    return (
                      <div key={i} className={itemClassName}>
                        <Spacing key={item.handle} size={10}>
                          <Heading
                            className="leading-none"
                            tag="h3"
                            font="serif"
                            size={['xxxxs', 'xxxxs', 'xxxxs', 'xxxxs', 'xxxs']}
                            uppercase
                            tracking="02"
                          >
                            <Link
                              className="cursor-pointer"
                              to={item.handle}
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              {item.title}
                            </Link>
                          </Heading>
                        </Spacing>
                      </div>
                    );
                  })}
                </div>
              </GridItem>
              <GridItem columnSize={[12, 12, 8]}>
                {this.products.map((item, i) => {
                  return (
                    <div key={i} id={item.handle}>
                      <Fragrance
                        key={item.handle}
                        index={i}
                        onIndexChange={this.handleNewIndex.bind(this)}
                        onFirstOut={this.handleFirstOut.bind(this)}
                        color1={item.color1}
                        color2={item.color2}
                        description={item.desc}
                        image1={item.images[0]}
                        image2={item.images[1]}
                        image3={item.images[2]}
                        story={item.story}
                        handle={item.handle}
                        layeringHandle={item.layeringHandle}
                        title={item.title}
                      >
                        {item.title}
                      </Fragrance>
                    </div>
                  );
                })}
              </GridItem>
              <GridItem columnSize={[0, 0, 2]}>
                <div
                  className="stickybits hidden md-flex flex-col h-screen items-center justify-center"
                  style={stickyStyle}
                >
                  <Button size="s">
                    <AtomLink href={`/product/${dataItem.handle}`}>
                      <span className="font-normal">Shop {dataItem.title}</span>
                    </AtomLink>
                  </Button>
                  {dataItem.layeringHandle && (
                    <Spacing size={20} position="t">
                      <AtomLink
                        className="opacity-50 hover-opacity-100"
                        tag="a"
                        href={`/product/${dataItem.layeringHandle}`}
                        underline
                      >
                        <Heading size="xs">Shop {dataItem.type}</Heading>
                      </AtomLink>
                    </Spacing>
                  )}
                </div>
              </GridItem>
            </Grid>
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
      collections(first: 20) {
        edges {
          node {
            handle
            id
            description
            descriptionHtml
            title
            image {
              transformedSrc
            }
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CollectionWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Collection);

export default withData(CollectionWithDataAndMutation);
