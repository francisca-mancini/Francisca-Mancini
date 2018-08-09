import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';

import generalStyles from './general.module.css';

const tagList = ['span', 'a', 'div'];

export default function AtomLink({
  children,
  className,
  underline,
  href,
  prefetch,
  tag,
  onClick
}) {
  const linkClassName = classNames(generalStyles.link, className, {
    [generalStyles.isUnderlined]: underline
  });
  const LinkTag = tag;

  const handleClick = e => {
    if (!onClick) return;
    e.preventDefault();

    onClick(e);
  };

  return (
    <Link href={href} prefetch={prefetch}>
      <LinkTag className={linkClassName} onClick={handleClick}>
        {children}
      </LinkTag>
    </Link>
  );
}

AtomLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  underline: PropTypes.bool,
  className: PropTypes.string,
  prefetch: PropTypes.bool,
  tag: PropTypes.oneOf(tagList)
};

AtomLink.defaultProps = {
  underline: false,
  prefetch: false,
  className: '',
  tag: 'a'
};
