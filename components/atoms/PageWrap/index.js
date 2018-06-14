import PropTypes from 'prop-types';
import classNames from 'classnames';

import generalStyles from './general.module.css';

export default function PageWrap({ children, className }) {
  return (
    <div className={classNames(generalStyles.pagewrap, className)}>
      {children}
    </div>
  );
}

PageWrap.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

PageWrap.defaultProps = {
  className: ''
};
