import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withGlobalState } from 'react-globally';

import { InlineGrid } from '../../atoms/Grid';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';

import BasketItem from '../../molecules/BasketItem';

import generalStyles from './general.module.css';
import Heading from '../../atoms/Heading';

import closeIcon from '../../../static/images/sprites/close.svg';

import withData from '../../../lib/withData';
import setSessionStorage from '../../../lib/setSessionStorage';
import getSessionStorage from '../../../lib/getSessionStorage';
import getProductPrice from '../../../lib/getProductPrice';

class Basket extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      basket: {},
      totalPrice: 0
    };

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    const basket = getSessionStorage('basket');

    if (!basket) {
      const basket = {
        count: 0,
        items: []
      };
      setSessionStorage('basket', basket);
      this.setState({ basket });
    }

    this.calculateTotal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.globalState.cartOpen !== this.props.globalState.cartOpen) {
      const basket = getSessionStorage('basket');
      this.setState({
        isOpen: this.props.isOpen,
        basket
      });

      this.calculateTotal();
    }

    if (prevProps.globalState.count !== this.props.globalState.count) {
      // const basket = getSessionStorage('basket');
      // this.setState({
      //   basket
      // });
      this.calculateTotal();
    }
  }

  calculateTotal() {
    const basket = getSessionStorage('basket');
    const items = basket.items;
    let totalPrice = 0;

    items.forEach(item => {
      const product = item.product;
      const quantity = item.quantity;
      const price = getProductPrice(product);
      totalPrice += parseInt(price * quantity);
    });

    this.setState({ totalPrice });
  }

  toggleBasket() {
    this.props.setGlobalState({
      cartOpen: false
    });
  }

  handleCheckout() {
    this.props.onCheckout();
  }

  render() {
    const { globalState } = this.props;
    const { basket, totalPrice } = this.state;
    const isOpen = globalState.cartOpen;
    const containerClassName = classNames(generalStyles.container, {
      [generalStyles.containerHidden]: !isOpen
    });
    const bgClassName = classNames(generalStyles.bg, {
      [generalStyles.bgHidden]: !isOpen
    });

    return (
      <Fragment>
        <div onClick={this.toggleBasket.bind(this)} className={bgClassName} />
        <div className={containerClassName}>
          <div className={generalStyles.header}>
            <InlineGrid>
              <div
                className="cursor-pointer"
                onClick={this.toggleBasket.bind(this)}
              >
                <img src={closeIcon} alt="close cart" width={19} height={19} />
              </div>
              <Heading size="xxxs" uppercase font="alternate">
                cart / {basket ? basket.count : 0}
              </Heading>
            </InlineGrid>
          </div>

          <div className={generalStyles.items}>
            <SimpleBar style={{ height: '100%' }}>
              {basket &&
                basket.items &&
                basket.items.map((item, index) => {
                  return (
                    <BasketItem
                      product={item.product}
                      quantity={item.quantity}
                      key={index}
                    />
                  );
                })}
            </SimpleBar>
          </div>

          <div className={generalStyles.footer}>
            <InlineGrid>
              <Paragraph size="s">Sub total</Paragraph>
              <Paragraph size="s">£{totalPrice}</Paragraph>
            </InlineGrid>
            <div className="opacity-75 my-5 md-my-20">
              <Paragraph size="xs">Free shipping above £200</Paragraph>
              <Paragraph size="xs">
                Secure payment visa master card &amp; paypal.
              </Paragraph>
            </div>
            <div className="text-center pt-10 md-pt-30">
              <Button onClick={this.handleCheckout} size="s">
                Checkout
              </Button>
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
