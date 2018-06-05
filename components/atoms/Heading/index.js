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
  m: 'text-m',
  l: 'text-l',
  xl: 'text-xl',
  xxl: 'text-xxl'
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
  tracking
}) {
  const HeadingTag = tag;
  const sizeToClass = propToClassName(size, sizeMap);
  const headingClassName = classNames(
    sizeToClass,
    `font-${font}`,
    `font-${weight}`,
    `tracking-${tracking}`,
    {
      'text-center': center,
      uppercase: uppercase,
      [`text-${color}`]: color
    }
  );

  return <HeadingTag className={headingClassName}>{children}</HeadingTag>;
}

Heading.propTypes = {
  tag: PropTypes.oneOf(tagList),
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizeMap)),
  center: PropTypes.bool,
  uppercase: PropTypes.bool,
  font: PropTypes.oneOf(['sans', 'serif']),
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
