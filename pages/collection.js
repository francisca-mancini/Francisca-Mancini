import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import App from '../components/App';
import stickybits from 'stickybits';
import classNames from 'classnames';

import { Grid, GridItem } from '../components/atoms/Grid';
import PageWrap from '../components/atoms/PageWrap';
import Spacing from '../components/atoms/Spacing';
import Heading from '../components/atoms/Heading';
import Button from '../components/atoms/Button';
import Link from '../components/atoms/Link';

import HeroVideo from '../components/molecules/HeroVideo';

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

import atlantica1 from '../static/images/_temp/collection/atlantica1.png';
import atlantica2 from '../static/images/_temp/collection/atlantica2.jpg';
import atlantica3 from '../static/images/_temp/collection/atlantica3.jpg';

import sadokan1 from '../static/images/_temp/collection/sadokan1.png';
import sadokan2 from '../static/images/_temp/collection/sadokan2.jpg';
import sadokan3 from '../static/images/_temp/collection/sadokan3.jpg';

import renaissance1 from '../static/images/_temp/collection/renaissance1.png';
import renaissance2 from '../static/images/_temp/collection/renaissance2.jpg';
import renaissance3 from '../static/images/_temp/collection/renaissance3.jpg';

const data = [
  {
    title: 'Atlantica',
    bgColor: '#d9d9e2',
    color1: '#E1C68F',
    color2: '#C5729F',
    slug: '/atlantica',
    layeringPack: '/layering-atlantica',
    image1: atlantica1,
    image2: atlantica2,
    image3: atlantica3
  },
  {
    title: 'Sadokan',
    bgColor: '#edfff4',
    color1: '#A5C899',
    color2: '#194365',
    slug: '/sadokan',
    layeringPack: '/layering-sadokan',
    image1: sadokan1,
    image2: sadokan2,
    image3: sadokan3
  },
  {
    title: 'Renaissance',
    bgColor: '#fef3ec',
    color1: '#E88F56',
    color2: '#AC1620',
    slug: '/renaissance',
    layeringPack: '/layering-renaissance',
    image1: renaissance1,
    image2: renaissance2,
    image3: renaissance3
  }
];

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
          color1: '#E88F56',
          color2: '#AC1620',
          layeringHandle: getProductLayeringHandle(
            this.collection.products,
            product
          )
        });
      }
    });

    console.log(this.products);
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
        <HeroVideo />
        <PageWrap>
          <Spacing size={80} type="padding">
            <CollectionIntro collection={this.collection} />
          </Spacing>
        </PageWrap>

        <Spacing size={80} type="padding" position="t">
          <div style={containerStyle}>
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
                              {item.title}
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
                      <Fragrance
                        key={item.handle}
                        index={i}
                        onIndexChange={this.handleNewIndex.bind(this)}
                        color1={item.color1}
                        color2={item.color2}
                        image1={item.images[0]}
                        image2={item.images[1]}
                        image3={item.images[2]}
                      >
                        {item.title}
                      </Fragrance>
                    );
                  })}
                </GridItem>
                <GridItem columnSize={2}>
                  <div
                    className="stickybits flex flex-col h-screen items-center justify-center"
                    style={stickyStyle}
                  >
                    <Button size="s">
                      <Link href={`/product/${dataItem.handle}`}>
                        {dataItem.title}
                      </Link>
                    </Button>
                    {dataItem.layeringHandle && (
                      <Spacing size={20} position="t">
                        <Link
                          className="opacity-50"
                          tag="a"
                          href={`/product/${dataItem.layeringHandle}`}
                          underline
                        >
                          <Heading size="xs">Shop layering pack</Heading>
                        </Link>
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
