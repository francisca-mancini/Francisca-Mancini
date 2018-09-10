import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Link from '../../../atoms/Link';
import Heading from '../../../atoms/Heading';

import generalStyles from './general.module.css';

export default class MobileDropdown extends PureComponent {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { title, children } = this.props;
    const { isOpen } = this.state;

    const titleClassName = classNames(generalStyles.title, {
      [generalStyles.titleOpen]: isOpen
    });

    const innerClassName = classNames(generalStyles.inner, {
      hidden: !isOpen
    });

    return (
      <div>
        <div
          className={titleClassName}
          onClick={this.toggleDropdown.bind(this)}
        >
          <Heading
            font="alternate"
            uppercase
            size="xxxs"
            weight="semilight"
            tracking="wide"
            center
          >
            {title}
          </Heading>
        </div>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }
}
