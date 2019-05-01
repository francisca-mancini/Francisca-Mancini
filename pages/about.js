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
import Heading from '../components/atoms/Heading';

import { checkoutQuery, checkout } from '../lib/checkout';
import getArticleByHandle from '../lib/getArticleByHandle';
import getPhilosophyDescription from '../lib/getPhilosophyDescription';

class About extends PureComponent {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    const articles = this.props.data.shop.articles.edges;
    const article = getArticleByHandle(articles, 'about').node;
    const description = getPhilosophyDescription(article);
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
          <Spacing size={60} type="padding">
            <MaxWidth value={1000} center>
              <Spacing position="b">
                <Heading
                  size={['m', 'l', 'xxl']}
                  font="jenson"
                  weight="light"
                  center
                >
                  {this.title}
                </Heading>
              </Spacing>

              {this.content.map((item, index) => {
                switch (item.type) {
                  case 'paragraph':
                    return (
                      <Spacing key={index} size={30} position="b">
                        <Paragraph
                          size={['m', 'l']}
                          font="jenson"
                          dangerouslySetInnerHTML={{ __html: item.string }}
                        />
                      </Spacing>
                    );
                  case 'title':
                    return (
                      <Spacing key={index}>
                        <Heading
                          size={['m', 'l', 'xxl']}
                          font="jenson"
                          weight="light"
                          center
                          dangerouslySetInnerHTML={{ __html: item.string }}
                        />
                      </Spacing>
                    );
                  case 'space':
                    return <Spacing key={index} />;
                }
              })}
            </MaxWidth>
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

const AboutWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(About);

export default withData(AboutWithDataAndMutation);
