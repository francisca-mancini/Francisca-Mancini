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
    slug: '/atlantica',
    layeringPack: '/layering-atlantica'
  },
  {
    title: 'Sadokan',
    bgColor: '#edfff4',
    slug: '/sadokan',
    layeringPack: '/layering-sadokan'
  },
  {
    title: 'Renaissance',
    bgColor: '#fef3ec',
    slug: '/renaissance',
    layeringPack: '/layering-renaissance'
  }
];

export default class Collection extends PureComponent {
  constructor() {
    super();

    this.state = {
      index: 0,
      bgColor: data[0].bgColour,
      title: data[0].title,
      shopSlug: data[0].slug,
      layerSlug: data[0].layeringPack
    };
  }

  componentDidMount() {
    stickybits('.stickybits');
  }

  handleNewIndex(index) {
    const item = data[index];

    this.setState({
      index: index,
      bgColor: item.bgColor,
      title: item.title,
      shopSlug: item.slug,
      layerSlug: item.layeringPack
    });
  }

  render() {
    const { bgColor, title, shopSlug, layerSlug } = this.state;
    const containerStyle = {
      backgroundColor: bgColor,
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
                    {data.map((item, index) => {
                      const itemClassName = classNames({
                        'opacity-100': index === this.state.index,
                        'opacity-50': index !== this.state.index
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
                  {data.map((item, index) => {
                    return (
                      <Fragrance
                        key={item.slug}
                        index={index}
                        onIndexChange={this.handleNewIndex.bind(this)}
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
                      <Link href={shopSlug}>{title}</Link>
                    </Button>
                    <Spacing size={20} position="t">
                      <Link
                        className="opacity-50"
                        tag="a"
                        href={layerSlug}
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
