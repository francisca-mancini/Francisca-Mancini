import React, { PureComponent, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../lib/withData';

import PageWrap from '../components/atoms/PageWrap';
import App from '../components/App';

import Basket from '../components/organisms/Basket';

import MaxWidth from '../components/atoms/MaxWidth';
import Spacing from '../components/atoms/Spacing';
import Paragraph from '../components/atoms/Paragraph';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';

import { checkoutQuery, checkout } from '../lib/checkout';
import getArticleByHandle from '../lib/getArticleByHandle';
import getPhilosophyDescription from '../lib/getPhilosophyDescription';

class Philosophy extends PureComponent {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    const articles = this.props.data.shop.articles.edges;
    const article = getArticleByHandle(articles, 'philosophy').node;
    const description = getPhilosophyDescription(article);
    this.image = article.image.transformedSrc;
    this.title = article.title;
    this.content = description;
  }

  handleCheckout() {
    checkout(this);
  }

  render() {
    return (
      <App collections={this.props.data.shop.collections}>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <MaxWidth value={1000} center>
            <Spacing>
              <MaxWidth value={400} center>
                <img src={this.image} alt="Philosophy" />
              </MaxWidth>
            </Spacing>

            <Heading
              size={['m', 'l', 'xxl']}
              font="jenson"
              weight="light"
              center
            >
              {this.title}
            </Heading>

            {this.content.map((item, index) => {
              switch (item.type) {
                case 'paragraph':
                  return (
                    <Spacing key={index}>
                      <Paragraph
                        size={['m', 'l', 'xxl']}
                        font="jenson"
                        dangerouslySetInnerHTML={{ __html: item.string }}
                      />
                    </Spacing>
                  );
                case 'quote':
                  return (
                    <MaxWidth value={670} center key={index}>
                      <Paragraph
                        weight="medium"
                        size={['m', 'l', 'xxl']}
                        center
                        dangerouslySetInnerHTML={{ __html: item.string }}
                      />
                    </MaxWidth>
                  );
                case 'date':
                  return (
                    <Fragment key={index}>
                      <Spacing size={20}>
                        <Heading
                          tag="h3"
                          size={['xs', 's', 'l']}
                          weight="semilight"
                        >
                          Francisca Mancini
                        </Heading>
                      </Spacing>
                      <Spacing size={20}>
                        <Heading
                          tag="h3"
                          size={['xs', 's', 'l']}
                          weight="semilight"
                          dangerouslySetInnerHTML={{ __html: item.string }}
                        />
                      </Spacing>
                    </Fragment>
                  );
              }
            })}

            <Spacing>
              <div className="text-center">
                <Button href="/">Discover the Collection</Button>
              </div>
            </Spacing>
          </MaxWidth>
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
      collections(first: 20) {
        edges {
          node {
            handle
            id
            description
            descriptionHtml
            title
          }
        }
      }
      articles(first: 20) {
        edges {
          node {
            content
            contentHtml
            handle
            image {
              altText
              id
              originalSrc
              transformedSrc
            }
            title
          }
        }
      }
    }
  }
`;

const PhilosophyWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Philosophy);

export default withData(PhilosophyWithDataAndMutation);
