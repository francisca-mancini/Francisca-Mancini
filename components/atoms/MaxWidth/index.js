import * as React from 'react';
import classNames from 'classnames';

export default function MaxWidth({ children, value, center }) {
  const maxWidthStyles = {
    maxWidth: `${value}px`
  };
  const maxWidthClassName = classNames('w-100', { 'mx-auto': center });

  const maxWidthProps = {
    style: maxWidthStyles,
    className: maxWidthClassName
  };

  return <div {...maxWidthProps}>{children}</div>;
}

MaxWidth.defaultProps = {
  center: false
};
