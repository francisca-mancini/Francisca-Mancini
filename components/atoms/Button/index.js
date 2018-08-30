import { PureComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import generalStyles from './general.module.css';
import sizeStyles from './size.module.css';
import kindStyles from './kind.module.css';

const tagList = ['div', 'button', 'span'];

const cx = classNames.bind({ ...generalStyles, ...sizeStyles, ...kindStyles });

export default class Button extends PureComponent {
  constructor() {
    super();
  }

  handleClick(e) {
    const { onClick } = this.props;
    if (!onClick) return;

    onClick(e);
  }

  render() {
    const { tag, href, children, kind, size, prefetch, className } = this.props;

    const ButtonTag = tag;
    const LinkTag = href ? Link : 'span';
    const linkProps = {
      href: href || null,
      prefetch: prefetch,
      className
    };

    return (
      <LinkTag {...linkProps}>
        <ButtonTag
          className={cx('button', kind, size, className)}
          onClick={this.handleClick.bind(this)}
        >
          <span className={cx('bg')} />
          <span className={cx('inner')}>{children}</span>
        </ButtonTag>
      </LinkTag>
    );
  }
}

Button.propTypes = {
  tag: PropTypes.oneOf(tagList),
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(sizeStyles)),
  kind: PropTypes.oneOf(Object.keys(kindStyles)),
  onClick: PropTypes.func
};

Button.defaultProps = {
  tag: 'span',
  size: 'm',
  onClick: null,
  kind: 'dark'
};
