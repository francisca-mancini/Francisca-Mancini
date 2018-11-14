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

class Help extends PureComponent {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentWillMount() {
    const articles = this.props.data.shop.articles.edges;
    const article = getArticleByHandle(articles, 'help').node;
    const description = getPhilosophyDescription(article);
    this.title = article.title;
    this.content = description;
  }

  handleCheckout() {
    checkout(this);
  }

  render() {
    return (
      <App>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <Spacing size={60} type="padding">
            <MaxWidth value={1000} center>
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
                  case 'title':
                    return (
                      <Heading
                        size={['m', 'l', 'xxl']}
                        font="jenson"
                        weight="light"
                        center
                        dangerouslySetInnerHTML={{ __html: item.string }}
                      />
                    );
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

const HelpWithDataAndMutation = compose(
  graphql(query),
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Help);

export default withData(HelpWithDataAndMutation);
