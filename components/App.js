import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Provider } from 'react-globally';

import '../style.css';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

class App extends PureComponent {
  componentDidMount() {
    const firstTime = sessionStorage.getItem('hasLoadedAlready');
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

    const initialState = {
      cartOpen: false,
      cart: {
        count: 0,
        items: []
      }
    };

    return (
      <Provider globalState={initialState}>
        <div className="root" id="root">
          <Header
            pathname={pathname}
            isLoaded={isLoaded}
            isLight={headerLight}
            isHome={isHome}
          />
          <div
            className={classNames({
              'pt-80': hasTopPad,
              'pb-80': hasBottomPad
            })}
          >
            {children}
          </div>
          <Footer isLight={footerLight} />
        </div>
      </Provider>
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
