import React, { PureComponent } from 'react';
import Observer from '@researchgate/react-intersection-observer';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Spacing from '../../../atoms/Spacing';

import generalStyles from './general.module.css';

export default class Fragrance extends PureComponent {
  constructor() {
    super();

    this.handleIntersection = this.handleIntersection.bind(this);
  }

  handleIntersection(e) {
    const num = Math.round(e.intersectionRatio * 100) / 100;
    const index = parseFloat(num.toFixed(1));

    if (index === 0.5) {
      this.props.onIndexChange(this.props.index);
    }
  }

  render() {
    const { children, index } = this.props;

    return (
      <Observer onChange={this.handleIntersection} threshold={[0.4, 0.5, 0.51]}>
        <div className={generalStyles.container}>
          <Heading size="m" font="serif" uppercase center>
            {children}
          </Heading>
          <Spacing size={30}>
            <Paragraph size="xl" font="jenson">
              This highly spiritual scent, with Frankincense, incense, musks,
              and fire it can be found after a trip across the north of Africa,
              from the High Atlas to the Nile. There is an altar carved in
              stone, and to the right, on the floor there is an ancient vase.
              Inside this vase, set aside for ceremonial offerings, lays
              Atlantica, a magical ritual perfume made out of the most precious
              oils.
            </Paragraph>
          </Spacing>
        </div>
      </Observer>
    );
  }
}
