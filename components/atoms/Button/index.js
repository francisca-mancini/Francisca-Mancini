import { Fragment } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import propToClassName from '../../../lib/propToClassName';

import generalStyles from './general.css';
import sizeStyles from './size.css';
import kindStyles from './kind.css';

const tagList = ['div', 'button', 'span'];

const cx = classNames.bind({ ...generalStyles, ...sizeStyles, ...kindStyles });

export default function Button({
  tag,
  href,
  children,
  onClick,
  kind,
  size,
  prefetch
}) {
  const ButtonTag = tag;
  const LinkTag = href ? Link : Fragment;

  const handleClick = e => {
    if (!onClick) return;

    onClick(e);
  };

  return (
    <LinkTag href={href} prefetch={prefetch}>
      <ButtonTag className={cx('button', kind, size)} onClick={handleClick}>
        {children}
      </ButtonTag>
    </LinkTag>
  );
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
