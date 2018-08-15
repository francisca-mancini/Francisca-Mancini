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
    const { tag, href, children, kind, size, prefetch } = this.props;

    const ButtonTag = tag;
    const LinkTag = href ? Link : 'span';
    const linkProps = {
      href: href || null,
      prefetch: prefetch
    };

    return (
      <LinkTag {...linkProps}>
        <ButtonTag
          className={cx('button', kind, size)}
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
  children: PropTypes.string.isRequired,
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
