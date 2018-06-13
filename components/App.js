import { withRouter } from 'next/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../style.css';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

function App({ children, router, headerLight, footerLight, hasTopPad }) {
  const pathname = router.pathname;

  return (
    <div className="root">
      <Header isLight={headerLight} />
      <div className={classNames('pb-80', { 'pt-80': hasTopPad })}>
        {children}
      </div>
      <Footer isLight={footerLight} />
    </div>
  );
}

App.propTypes = {
  hasTopPad: PropTypes.bool,
  headerLight: PropTypes.bool,
  footerLight: PropTypes.bool
};

App.defaultProps = {
  hasTopPad: true,
  headerLight: false,
  footerLight: false
};

export default withRouter(App);
