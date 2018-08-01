import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withGlobalState } from 'react-globally';

import MaxWidth from '../../atoms/MaxWidth';
import { InlineGrid } from '../../atoms/Grid';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';

import BasketItem from '../../molecules/BasketItem';

import generalStyles from './general.module.css';
import Heading from '../../atoms/Heading';

import withData from '../../../lib/withData';
import setSessionStorage from '../../../lib/setSessionStorage';
import getSessionStorage from '../../../lib/getSessionStorage';

class Basket extends PureComponent {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.basket = getSessionStorage('basket');

    if (!this.basket) {
      const basket = {
        items: [1, 2, 3, 4, 5]
      };
      setSessionStorage('basket', basket);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: this.props.isOpen });
      this.basket = getSessionStorage('basket');
    }
  }

  toggleBasket() {
    this.props.setGlobalState({
      cartOpen: false
    });
  }

  render() {
    const { globalState } = this.props;
    const isOpen = globalState.cartOpen;
    const containerClassName = classNames(generalStyles.container, {
      [generalStyles.containerHidden]: !isOpen
    });
    const bgClassName = classNames(generalStyles.bg, {
      [generalStyles.bgHidden]: !isOpen
    });

    // console.log(this.props.data)

    return (
      <Fragment>
        <div onClick={this.toggleBasket.bind(this)} className={bgClassName} />
        <div className={containerClassName}>
          <div className={generalStyles.header}>
            <InlineGrid>
              <div onClick={this.toggleBasket.bind(this)}>x</div>
              <Heading size="xxxs" uppercase font="alternate">
                cart / {this.basket && this.basket.items.length}
              </Heading>
            </InlineGrid>
          </div>

          <div className={generalStyles.items}>
            <SimpleBar style={{ height: '100%' }}>
              {this.basket &&
                this.basket.items.map((item, index) => {
                  return <BasketItem key={index} />;
                })}
            </SimpleBar>
          </div>

          <div className={generalStyles.footer}>
            <InlineGrid>
              <Paragraph size="s">Sub total</Paragraph>
              <Paragraph size="s">£850</Paragraph>
            </InlineGrid>
            <div className="opacity-75 my-20">
              <Paragraph size="xs">Free shipping above £200</Paragraph>
              <Paragraph size="xs">
                Secure payment visa master card &amp; paypal.
              </Paragraph>
            </div>
            <div className="text-center pt-30">
              <Button size="s">Checkout</Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// const checkoutQuery = gql`
//   mutation {
//     checkoutCreate(input: {
//       lineItems: [{ variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84MTg5NTMzMTU5NDc2", quantity: 1 }]
//     }) {
//       userErrors {
//         field
//         message
//       }
//       checkout {
//         id
//         webUrl
//         lineItems(first: 5) {
//           edges {
//             node {
//               title
//               quantity
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const query = gql`
//   query query {
//     shop {
//       name
//       description
//       articles(first: 20) {
//         edges {
//           node {
//             content
//           }
//         }
//       }
//       collections(first: 20) {
//         edges {
//           node {
//             handle
//             id
//             description
//             descriptionHtml
//             title
//             products(first: 20) {
//               edges {
//                 node {
//                   id
//                   handle
//                   title
//                   description
//                   descriptionHtml
//                   productType
//                   tags
//                   images(first: 20) {
//                     edges {
//                       node {
//                         altText
//                         id
//                         originalSrc
//                         transformedSrc
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const BasketWithMutation = compose(
//   graphql(checkoutQuery)
// )(withGlobalState(Basket))

export default withGlobalState(Basket);
