import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Observer from 'react-intersection-observer';

import generalStyles from './general.module.css';

export default class FadeIn extends PureComponent {
  constructor() {
    super();

    this.state = {
      isHidden: true
    };

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  handleVisibilityChange(inView) {
    if (inView) {
      this.setState({ isHidden: false });
    }
  }

  render() {
    const { isHidden } = this.state;
    const observerClassName = classNames(generalStyles.container, {
      [generalStyles.isHidden]: isHidden
    });

    return (
      <Observer
        tag="div"
        className={observerClassName}
        onChange={this.handleVisibilityChange}
      >
        {this.props.children}
      </Observer>
    );
  }
}
