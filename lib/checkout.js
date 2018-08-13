import gql from 'graphql-tag';

import getSessionStorage from './getSessionStorage';
import getProductVariantId from './getProductVariantId';

export const checkoutQuery = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

export function checkout(self) {
  const basket = getSessionStorage('basket');
  const items = basket.items;
  const lineItems = [];

  items.forEach(item => {
    lineItems.push({
      variantId: getProductVariantId(item.product),
      quantity: item.quantity
    });
  });

  self.props
    .checkoutQuery({
      variables: {
        input: {
          lineItems: lineItems
        }
      }
    })
    .then(res => {
      const url = res.data.checkoutCreate.checkout.webUrl;

      window.location.href = url;
    })
    .catch(error => {
      console.error(error);
    });
}
