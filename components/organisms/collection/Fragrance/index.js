import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Spacing from '../../../atoms/Spacing';

import generalStyles from './general.module.css';

export default class Fragrance extends PureComponent {
  constructor() {
    super();

    this.state = {
      inView: false,
      containerHeight: 0
    };
  }

  componentDidMount() {
    this.setContainerHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inView !== this.state.inView && this.state.inView) {
      this.props.onIndexChange(this.props.index);
    }
  }

  setContainerHeight() {
    this.setState({ containerHeight: this.containerRef.offsetHeight / 3 });
  }

  handleWaypointEnter(previousPosition, currentPosition, event) {
    this.setState({ inView: true });
  }

  handleWaypointLeave(e) {
    this.setState({ inView: false });
  }

  render() {
    const { containerHeight } = this.state;
    const { children, index } = this.props;

    return (
      <Waypoint
        onEnter={this.handleWaypointEnter.bind(this)}
        onLeave={this.handleWaypointLeave.bind(this)}
        fireOnRapidScroll
        topOffset={`${containerHeight}px`}
        bottomOffset={`${containerHeight}px`}
      >
        <div
          className={generalStyles.container}
          ref={ref => {
            this.containerRef = ref;
          }}
        >
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
      </Waypoint>
    );
  }
}
