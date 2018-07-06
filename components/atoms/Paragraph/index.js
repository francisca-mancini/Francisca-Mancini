import PropTypes from 'prop-types';
import classNames from 'classnames';
import propToClassName from '../../../lib/propToClassName';

const tagList = ['div', 'p', 'span'];

const sizeMap = {
  xxxxs: 'text-xxxxs',
  xxxs: 'text-xxxs',
  xxs: 'text-xxs',
  xs: 'text-xs',
  s: 'text-s',
  m: 'text-m',
  l: 'text-l',
  xl: 'text-xl',
  xxl: 'text-xxl',
  xxxl: 'text-xxxl'
};

export default function Paragraph({
  tag,
  children,
  size,
  font,
  center,
  justified,
  weight,
  color,
  indent
}) {
  const ParagraphTag = tag;
  const sizeToClass = propToClassName(size, sizeMap);
  const paragraphStyles = {
    'text-indent': indent ? '10%' : '0'
  };
  const paragraphClassName = classNames(
    sizeToClass,
    `font-${font}`,
    `font-${weight}`,
    'my-0',
    {
      'text-center': center,
      'text-justify': justified,
      [`text-${color}`]: color
    }
  );

  return (
    <ParagraphTag className={paragraphClassName} style={paragraphStyles}>
      {children}
    </ParagraphTag>
  );
}

Paragraph.propTypes = {
  tag: PropTypes.oneOf(tagList),
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizeMap)),
  center: PropTypes.bool,
  font: PropTypes.oneOf(['sans', 'serif']),
  weight: PropTypes.string,
  indent: PropTypes.bool
};

Paragraph.defaultProps = {
  tag: 'p',
  size: 'm',
  center: false,
  font: 'sans',
  weight: 'normal',
  indent: false
};
