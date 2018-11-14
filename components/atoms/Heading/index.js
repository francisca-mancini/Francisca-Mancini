import PropTypes from 'prop-types';
import classNames from 'classnames';
import propToClassName from '../../../lib/propToClassName';

const tagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'];

const sizeMap = {
  xxxxs: 'text-xxxxs',
  xxxs: 'text-xxxs',
  xxs: 'text-xxs',
  xs: 'text-xs',
  s: 'text-s',
  'r-m': 'text-r-m',
  m: 'text-m',
  base: 'text-base',
  'rr-l': 'text-rr-l',
  'r-l': 'text-r-l',
  'r-xl': 'text-r-xl',
  l: 'text-l',
  xl: 'text-xl',
  'rr-xxl': 'text-rr-xxl',
  'r-xxl': 'text-r-xxl',
  xxl: 'text-xxl',
  xxxl: 'text-xxxl'
};

export default function Heading({
  tag,
  children,
  size,
  center,
  color,
  uppercase,
  font,
  weight,
  tracking,
  className,
  ...props
}) {
  const HeadingTag = tag;
  const sizeToClass = propToClassName(size, sizeMap);
  const headingClassName = classNames(
    sizeToClass,
    `font-${font}`,
    `font-${weight}`,
    `tracking-${tracking}`,
    className,
    {
      'text-center': center,
      uppercase: uppercase,
      [`text-${color}`]: color
    }
  );

  return (
    <HeadingTag {...props} className={headingClassName}>
      {children}
    </HeadingTag>
  );
}

Heading.propTypes = {
  tag: PropTypes.oneOf(tagList),
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  center: PropTypes.bool,
  uppercase: PropTypes.bool,
  font: PropTypes.oneOf(['sans', 'serif', 'jenson', 'alternate']),
  weight: PropTypes.string,
  tracking: PropTypes.string
};

Heading.defaultProps = {
  tag: 'div',
  size: 'xl',
  center: false,
  uppercase: false,
  font: 'sans',
  weight: 'normal',
  tracking: 'normal'
};
