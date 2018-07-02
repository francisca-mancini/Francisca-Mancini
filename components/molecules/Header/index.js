import { withRouter } from 'next/router';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import throttle from 'lodash/throttle';

import Heading from '../../atoms/Heading';
import Spacing from '../../atoms/Spacing';
import Link from '../../atoms/Link';
import PageWrap from '../../atoms/PageWrap';
import { InlineGrid } from '../../atoms/Grid';

import logoWhite from '../../../static/images/sprites/logo-white.svg';
import logoBlack from '../../../static/images/sprites/logo-black.svg';
import logoMiniWhite from '../../../static/images/sprites/logo-mini-white.svg';
import logoMiniBlack from '../../../static/images/sprites/logo-mini-black.svg';
import cartWhite from '../../../static/images/sprites/cart-white.svg';
import cartBlack from '../../../static/images/sprites/cart-black.svg';
import menuWhite from '../../../static/images/sprites/menu-white.svg';
import menuBlack from '../../../static/images/sprites/menu-black.svg';

import generalStyles from './general.module.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLight: props.isLight
    };

    this.heroHeight = 0;

    this.handleScroll = throttle(this.handleScroll.bind(this), 200);
    this.handleResize = throttle(this.handleResize.bind(this), 200);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });

    if (this.props.isHome) {
      this.getHeroHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  getHeroHeight() {
    const hero = document.querySelector('#heroVideo');
    const height = hero.offsetHeight - 40;

    this.heroHeight = height;
  }

  handleScroll(e) {
    const y = e.pageY;

    if (this.props.isHome && y >= this.heroHeight) {
      this.setState({ isLight: false });
    }

    if (this.props.isHome && y < this.heroHeight) {
      this.setState({ isLight: true });
    }
  }

  handleResize() {
    this.getHeroHeight();
  }

  render() {
    const { isLight } = this.state;
    const headerClassName = classNames(generalStyles.header);
    const logoSrc = isLight ? logoWhite : logoBlack;
    const logoMiniSrc = isLight ? logoMiniWhite : logoMiniBlack;
    const cartSrc = isLight ? cartWhite : cartBlack;
    const menuSrc = isLight ? menuWhite : menuBlack;
    const linkColor = isLight ? 'white' : 'black';

    const NavLink = ({
      children,
      href,
      isDropdown,
      isDropdownTrigger,
      zIndex
    }) => {
      const pathname = this.props.router.pathname;
      const notActive = pathname === '/' || pathname === '/product';
      const isActive = pathname === href;

      const linkClassName = classNames(generalStyles.link, {
        [generalStyles.dropdownTrigger]: isDropdownTrigger,
        [generalStyles.link]: !notActive && !isActive,
        [generalStyles.active]: notActive || isActive,
        'relative z-10': zIndex
      });

      return (
        <div className={linkClassName}>
          <Spacing size={isDropdown ? 5 : 10} position={isDropdown ? 'y' : 'x'}>
            <Link href={href}>
              <Heading
                tag="span"
                font="alternate"
                uppercase
                size="xxxs"
                weight="semilight"
                tracking="wide"
                color={isDropdown ? 'black' : linkColor}
              >
                {children}
              </Heading>
            </Link>
          </Spacing>
        </div>
      );
    };

    const CollectionDropdown = () => {
      return (
        <div className={generalStyles.dropdown}>
          <div className={generalStyles.dropdownInner}>
            <NavLink isDropdown href="/collection/maps-travel">
              N°1: MAPS, TRAVEL
            </NavLink>
            <NavLink isDropdown href="/collection/maps-travel">
              N°1: MAPS, TRAVEL
            </NavLink>
          </div>
        </div>
      );
    };

    return (
      <header className={headerClassName}>
        <PageWrap>
          <InlineGrid>
            <MediaQuery maxDeviceWidth={767}>
              <img src={menuSrc} width={34} height={18} />
            </MediaQuery>
            <Link href="/" className="leading-none flex items-center">
              <MediaQuery minDeviceWidth={768} values={{ deviceWidth: 800 }}>
                {matches => {
                  if (matches) {
                    return <img src={logoSrc} width={243} height={16} />;
                  } else {
                    return <img src={logoMiniSrc} width={41} height={44} />;
                  }
                }}
              </MediaQuery>
            </Link>
            <MediaQuery minDeviceWidth={768}>
              {matches => {
                if (matches) {
                  return (
                    <InlineGrid>
                      <NavLink className="relative" isDropdownTrigger>
                        Collections
                        <CollectionDropdown />
                      </NavLink>
                      <NavLink href="/shop" zIndex>
                        Shop
                      </NavLink>
                      <NavLink href="/philosophy">Philosophy</NavLink>
                      <NavLink href="/account">Account</NavLink>
                      <NavLink href="/cart">Cart / 0</NavLink>
                    </InlineGrid>
                  );
                } else {
                  return <img src={cartSrc} width={20} height={20} />;
                }
              }}
            </MediaQuery>
          </InlineGrid>
        </PageWrap>
      </header>
    );
  }
}

export default withRouter(Header);

Header.propTypes = {
  isLight: PropTypes.bool,
  isHome: PropTypes.bool
};

Header.defaultProps = {
  isLight: false,
  isHome: false
};
