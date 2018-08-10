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
import setSessionStorage from '../../../lib/setSessionStorage';
import getSessionStorage from '../../../lib/getSessionStorage';

import generalStyles from './general.module.css';

class BasketItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.quantity,
      isRemoved: false
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
    });

    if (!product) return;

    const oldQuantity = product.quantity;
    const newItems = [...items];

    setSessionStorage('basket', {
      items: newItems,
      count: count - oldQuantity
    });

    this.setState({ isRemoved: true });

    this.props.setGlobalState({
      count: count - oldQuantity,
      cartOpen: false
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

    setSessionStorage('basket', {
      items: newItems,
      count: count + diff
    });

    this.props.setGlobalState({
      count: count + diff
    });
  }

  render() {
    const { product } = this.props;
    const { quantity, isRemoved } = this.state;
    const wrapperStyle = {
      display: isRemoved ? 'none' : 'block'
    };

    return (
      <div style={wrapperStyle}>
        <Spacing size={25} position="x" type="padding">
          <Spacing size={40}>
            <Grid align="center" gap={10}>
              <GridItem columnSize={4}>
                <ProductThumbnail hasNoInfo product={product} />
              </GridItem>
              <GridItem columnSize={8}>
                <InlineGrid>
                  <Heading font="serif" size="xxxxs" uppercase>
                    {getProductTitle(product)}
                  </Heading>
                  <Heading font="sans" size="s">
                    £{getProductPrice(product)}
                  </Heading>
                </InlineGrid>
                <Spacing size={10} position="t">
                  <Paragraph size="xs">
                    Lorem ipsum kg dfkjgh kjhg fgj hgjkdf gk
                  </Paragraph>
                </Spacing>
                <Spacing size={5}>
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
                    <div
                      onClick={this.delete}
                      underline
                      className="opacity-75 cursor-pointer underline"
                    >
                      Remove item
                    </div>
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
