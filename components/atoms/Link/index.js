import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';

import generalStyles from './general.css';

export default function AtomLink({
  children,
  className,
  underline,
  href,
  prefetch,
  onClick
}) {
  const linkClassName = classNames(generalStyles.link, className, {
    [generalStyles.isUnderline]: underline
  });

  const handleClick = e => {
    if (!onClick) return;

    onClick(e);
  };

  return (
    <Link href={href} prefetch={prefetch}>
      <a className={linkClassName} onClick={handleClick}>
        {children}
      </a>
    </Link>
  );
}

AtomLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  underline: PropTypes.bool,
  className: PropTypes.string,
  prefetch: PropTypes.bool
};

AtomLink.defaultProps = {
  underline: false,
  prefetch: false,
  className: ''
};
