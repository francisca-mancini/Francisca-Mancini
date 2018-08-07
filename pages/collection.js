import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
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

class Collection extends PureComponent {
  static getInitialProps({ query: { handle } }) {
    return { collectionHandle: handle };
  }

  constructor() {
    super();

    this.state = { index: 0 };
  }

  componentWillMount() {
    this.collection = getCollection(
      this.props.data,
      this.props.collectionHandle
    );

    if (!this.collection) {
      this.props.url.push('/404');
    }

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

  getProducts() {
    this.products = [];

    this.collection.products.edges.forEach(item => {
      const product = item.node;

      if (product.productType === 'fragrance') {
        this.products.push({
          title: getProductTitle(product),
          handle: getProductHandle(product),
          description: getProductDescription(product),
          bgColor: getProductBackground(product),
          images: getProductCollectionImages(product),
          color1: getProductGradient(product).color1,
          color2: getProductGradient(product).color2,
          desc: getCollectionDescription(product),
          layeringHandle: getProductLayeringHandle(
            this.collection.products,
            product
          )
        });
      }
    });
  }

  render() {
    const { index } = this.state;
    const dataItem = this.products[index];
    const containerStyle = {
      backgroundColor: dataItem.bgColor,
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
        <Basket />
        <HeroVideo />
        <PageWrap>
          <Spacing size={80} type="padding">
            <CollectionIntro collection={this.collection} to="fragrances" />
          </Spacing>
        </PageWrap>

        <Spacing size={80} type="padding" position="t">
          <div style={containerStyle} id="fragrances">
            <PageWrap>
              <Grid gap={20} align="stretch">
                <GridItem columnSize={2}>
                  <div
                    className="stickybits flex flex-col h-screen justify-center"
                    style={stickyStyle}
                  >
                    {this.products.map((item, i) => {
                      const itemClassName = classNames({
                        'opacity-100': i === index,
                        'opacity-50': i !== index
                      });

                      return (
                        <div className={itemClassName}>
                          <Spacing key={item.handle} size={10}>
                            <Heading
                              className="leading-none"
                              tag="h3"
                              font="serif"
                              size="xxxs"
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
                <GridItem columnSize={8}>
                  {this.products.map((item, i) => {
                    return (
                      <div id={item.handle}>
                        <Fragrance
                          key={item.handle}
                          index={i}
                          onIndexChange={this.handleNewIndex.bind(this)}
                          color1={item.color1}
                          color2={item.color2}
                          description={item.desc}
                          image1={item.images[0]}
                          image2={item.images[1]}
                          image3={item.images[2]}
                        >
                          {item.title}
                        </Fragrance>
                      </div>
                    );
                  })}
                </GridItem>
                <GridItem columnSize={2}>
                  <div
                    className="stickybits flex flex-col h-screen items-center justify-center"
                    style={stickyStyle}
                  >
                    <Button size="s">
                      <AtomLink href={`/product/${dataItem.handle}`}>
                        <span className="font-normal">
                          Shop {dataItem.title}
                        </span>
                      </AtomLink>
                    </Button>
                    {dataItem.layeringHandle && (
                      <Spacing size={20} position="t">
                        <AtomLink
                          className="opacity-50"
                          tag="a"
                          href={`/product/${dataItem.layeringHandle}`}
                          underline
                        >
                          <Heading size="xs">Shop layering pack</Heading>
                        </AtomLink>
                      </Spacing>
                    )}
                  </div>
                </GridItem>
              </Grid>
            </PageWrap>
          </div>
        </Spacing>
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default withData(graphql(query)(Collection));
