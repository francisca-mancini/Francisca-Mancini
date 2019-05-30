import React, { PureComponent } from 'react';
import throttle from 'lodash/throttle';
import find from 'lodash/find';
import remove from 'lodash/remove';
import { withGlobalState } from 'react-globally';

import { Grid, GridItem, InlineGrid } from '../../atoms/Grid';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Spacing from '../../atoms/Spacing';
import AtomLink from '../../atoms/Link';
import ProductThumbnail from '../../molecules/ProductThumbnail';

import getProductPrice from '../../../lib/getProductPrice';
import getProductTitle from '../../../lib/getProductTitle';
import getProductDescription from '../../../lib/getProductDescription';
import setSessionStorage from '../../../lib/setSessionStorage';
import getSessionStorage from '../../../lib/getSessionStorage';

import generalStyles from './general.module.css';

class BasketItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.quantity
    };

    this.add = throttle(this.add.bind(this), 200);
    this.remove = throttle(this.remove.bind(this), 200);
    this.delete = this.delete.bind(this);
    this.updateSession = this.updateSession.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity !== this.props.quantity) {
      this.setState({ quantity: this.props.quantity });
    }
  }

  add() {
    this.setState({ quantity: this.state.quantity + 1 }, () => {
      this.updateSession();
    });
  }

  remove() {
    const { quantity } = this.state;

    if (quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 }, () => {
        this.updateSession();
      });
    }
  }

  delete() {
    const basket = getSessionStorage('basket');
    const items = basket.items;
    const count = basket.count;

    const product = remove(items, o => {
      return o.product.id === this.props.product.id;
    })[0];

    if (!product) return;

    const oldQuantity = product.quantity;
    const newItems = [...items];

    const newcount = count - oldQuantity;
    const cartOpen = newcount > 0 ? true : false;

    setSessionStorage('basket', {
      items: newItems,
      count: newcount
    });

    this.props.setGlobalState({
      count: newcount,
      cartOpen: cartOpen
    });
  }

  updateSession() {
    const { quantity } = this.state;
    const basket = getSessionStorage('basket');
    const items = basket.items;
    const count = basket.count;

    const product = find(items, o => {
      return o.product.id === this.props.product.id;
    });

    if (!product) return;

    const oldQuantity = product.quantity;
    const diff = quantity - oldQuantity;
    product.quantity = quantity;
    const newItems = [...items];
    const newCount = count + diff;

    setSessionStorage('basket', {
      items: newItems,
      count: newCount
    });

    this.props.setGlobalState({
      count: newCount
    });
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    return (
      <div>
        <Spacing size={25} position="x" type="padding">
          <Spacing size={40}>
            <Grid align="center" gap={10}>
              <GridItem columnSize={4}>
                <ProductThumbnail hasNoInfo product={product} />
              </GridItem>
              <GridItem columnSize={8}>
                <InlineGrid align="end">
                  <Heading font="serif" size="xxxxs" uppercase>
                    {getProductTitle(product)}
                  </Heading>
                  <Heading font="sans" size="s">
                    £{getProductPrice(product)}
                  </Heading>
                </InlineGrid>
                <Spacing size={5}>
                  <Paragraph weight="semilight" size="xxs">
                    {getProductDescription(product)}
                  </Paragraph>
                </Spacing>
                <Spacing size={10}>
                  <InlineGrid justify="start">
                    <Paragraph size="xs">Quantity</Paragraph>
                    <div onClick={this.remove} className={generalStyles.minus}>
                      -
                    </div>
                    <Paragraph size="xs">{quantity}</Paragraph>
                    <div onClick={this.add} className={generalStyles.plus}>
                      +
                    </div>
                  </InlineGrid>
                </Spacing>
                <InlineGrid justify="end">
                  <Paragraph size="xs">
                    <span
                      onClick={this.delete}
                      className="opacity-75 cursor-pointer underline"
                    >
                      Remove item
                    </span>
                  </Paragraph>
                </InlineGrid>
              </GridItem>
            </Grid>
          </Spacing>
        </Spacing>
      </div>
    );
  }
}

export default withGlobalState(BasketItem);
