import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rellax from 'rellax';

import generalStyles from './general.module.css';

export default class ParallaxWrapper extends Component {
  constructor() {
    super();

    this.rellax = null;
    this.rellaxRef = null;
  }

  componentDidMount() {
    const { speed, center, round, vertical, horizontal } = this.props;

    this.rellax = new Rellax(this.rellaxRef, {
      speed,
      center,
      round,
      vertical,
      horizontal
    });
  }

  componentWillUnmount() {
    this.rellax.destroy();
  }

  render() {
    const { positionAbsolute, children } = this.props;
    const styles = {
      position: positionAbsolute ? 'absolute' : 'static'
    };
    const parallaxWrapperProps = {
      style: styles,
      ref: ref => {
        this.rellaxRef = ref;
      }
    };

    return (
      <div className={generalStyles.wrap} {...parallaxWrapperProps}>
        {children}
      </div>
    );
  }
}

ParallaxWrapper.propTypes = {
  positionAbsolute: PropTypes.bool,
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  center: PropTypes.bool,
  round: PropTypes.bool,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool
};

ParallaxWrapper.defaultProps = {
  speed: 1,
  center: true,
  round: true,
  vertical: true,
  horizontal: false,
  positionAbsolute: true
};
