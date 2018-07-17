import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../style.css';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

class App extends PureComponent {
  componentDidMount() {
    var firstTime = sessionStorage.getItem('hasLoadedAlready');
    if (!firstTime) {
      setTimeout(() => {
        sessionStorage.setItem('hasLoadedAlready', 'true');
      }, 1000);
    }
  }

  render() {
    const {
      children,
      router,
      headerLight,
      isHome,
      footerLight,
      hasTopPad,
      hasBottomPad,
      isLoaded
    } = this.props;

    const pathname = router.pathname;

    return (
      <div className="root" id="root">
        <Header
          pathname={pathname}
          isLoaded={isLoaded}
          isLight={headerLight}
          isHome={isHome}
        />
        <div
          className={classNames({ 'pt-80': hasTopPad, 'pb-80': hasBottomPad })}
        >
          {children}
        </div>
        <Footer isLight={footerLight} />
      </div>
    );
  }
}

App.propTypes = {
  hasTopPad: PropTypes.bool,
  headerLight: PropTypes.bool,
  footerLight: PropTypes.bool,
  isLoaded: PropTypes.bool
};

App.defaultProps = {
  hasTopPad: true,
  hasBottomPad: true,
  headerLight: false,
  footerLight: false,
  isLoaded: true
};

export default withRouter(App);
