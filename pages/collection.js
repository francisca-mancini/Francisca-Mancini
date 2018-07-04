import React, { PureComponent } from 'react';
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

const data = [
  {
    title: 'Atlantica',
    bgColor: '#d9d9e2',
    color1: '#E1C68F',
    color2: '#C5729F',
    slug: '/atlantica',
    layeringPack: '/layering-atlantica'
  },
  {
    title: 'Sadokan',
    bgColor: '#edfff4',
    color1: '#A5C899',
    color2: '#194365',
    slug: '/sadokan',
    layeringPack: '/layering-sadokan'
  },
  {
    title: 'Renaissance',
    bgColor: '#fef3ec',
    color1: '#E88F56',
    color2: '#AC1620',
    slug: '/renaissance',
    layeringPack: '/layering-renaissance'
  }
];

export default class Collection extends PureComponent {
  constructor() {
    super();

    this.state = { index: 0 };
  }

  componentDidMount() {
    stickybits('.stickybits');
  }

  handleNewIndex(index) {
    this.setState({
      index
    });
  }

  render() {
    const { index } = this.state;
    const dataItem = data[index];
    const containerStyle = {
      backgroundColor: dataItem.bgColor,
      transition: '0.8s ease-in-out'
    };
    const stickyStyle = {
      top: 0,
      bottom: 'auto'
    };

    return (
      <App hasTopPad={false} hasBottomPad={false} headerLight isHome>
        <HeroVideo />
        <PageWrap>
          <Spacing size={80} type="padding">
            <CollectionIntro />
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
                    {data.map((item, i) => {
                      const itemClassName = classNames({
                        'opacity-100': i === index,
                        'opacity-50': i !== index
                      });

                      return (
                        <div className={itemClassName}>
                          <Spacing key={item.slug} size={10}>
                            <Heading
                              tag="h3"
                              font="serif"
                              size="xxxs"
                              uppercase
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
                  {data.map((item, i) => {
                    return (
                      <Fragrance
                        key={item.slug}
                        index={i}
                        onIndexChange={this.handleNewIndex.bind(this)}
                        color1={item.color1}
                        color2={item.color2}
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
                      <Link href={dataItem.shopSlug}>{dataItem.title}</Link>
                    </Button>
                    <Spacing size={20} position="t">
                      <Link
                        className="opacity-50"
                        tag="a"
                        href={dataItem.layerSlug}
                        underline
                      >
                        <Heading size="xs">Shop layering pack</Heading>
                      </Link>
                    </Spacing>
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
