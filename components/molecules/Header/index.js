import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import throttle from 'lodash/throttle';
import { withGlobalState } from 'react-globally';
import SimpleBar from 'simplebar-react';

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
import getSessionStorage from '../../../lib/getSessionStorage';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLight: props.isLight,
      basketCount: 0,
      isMobileOpen: false
    };

    this.heroHeight = 0;

    this.handleScroll = throttle(this.handleScroll.bind(this), 200);
    this.handleResize = throttle(this.handleResize.bind(this), 200);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });

    if (this.props.isHome) {
      this.getHeroHeight();
    }

    const basket = getSessionStorage('basket');
    this.setState({
      basketCount: basket ? basket.count : 0
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.globalState.cartOpen !== this.props.globalState.cartOpen) {
      const basket = getSessionStorage('basket');
      this.setState({
        basketCount: basket ? basket.count : 0
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  getHeroHeight() {
    const hero = document.querySelector('#heroVideo');
    const height = hero && hero.offsetHeight - 40;

    this.heroHeight = height;
  }

  handleScroll(e) {
    let y = e.pageY;

    if (e.pageY === undefined) {
      y = window.pageYOffset;
    }

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

  toggleBasket() {
    this.props.setGlobalState({
      cartOpen: true
    });
  }

  toggleMobileMenu() {
    this.setState({
      isMobileOpen: !this.state.isMobileOpen
    });
  }

  render() {
    const { isLoaded, pathname } = this.props;
    const { isLight, basketCount, isMobileOpen } = this.state;
    const headerClassName = classNames(generalStyles.header, {
      [generalStyles.headerHidden]: !isLoaded,
      [generalStyles.headerShow]: isLoaded
    });
    const mobileContainerClassName = classNames(generalStyles.mobileContainer, {
      [generalStyles.mobileContainerOpen]: isMobileOpen,
      [generalStyles.mobileContainerClosed]: !isMobileOpen
    });
    const headerLight = isMobileOpen ? false : isLight;
    const logoSrc = headerLight ? logoWhite : logoBlack;
    const logoMiniSrc = headerLight ? logoMiniWhite : logoMiniBlack;
    const cartSrc = headerLight ? cartWhite : cartBlack;
    const menuSrc = headerLight ? menuWhite : menuBlack;
    const linkColor = headerLight ? 'white' : 'black';

    const NavLink = ({
      children,
      href,
      isDropdown,
      isDropdownTrigger,
      zIndex,
      isCollection,
      onClick
    }) => {
      const notActive = pathname === '/';
      const isShop = pathname === '/product' && href === '/shop';
      const isCollect = pathname === '/collection' && isCollection;
      const isActive = pathname === href || isShop || isCollect;

      const linkClassName = classNames(generalStyles.link, {
        [generalStyles.dropdownTrigger]: isDropdownTrigger,
        [generalStyles.link]: !notActive && !isActive,
        [generalStyles.active]: notActive || isActive,
        'relative z-10': zIndex
      });

      return (
        <div className={linkClassName}>
          <Spacing size={isDropdown ? 5 : 10} position={isDropdown ? 'y' : 'x'}>
            {onClick ? (
              <span className={generalStyles.innerLink} onClick={onClick}>
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
              </span>
            ) : (
              <Link href={href} className={generalStyles.innerLink}>
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
            )}
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
        <PageWrap className="max-w-full relative z-20">
          <InlineGrid>
            <MediaQuery maxDeviceWidth={767}>
              {matches => {
                if (matches) {
                  return (
                    <img
                      onClick={this.toggleMobileMenu}
                      className="cursor-pointer"
                      src={menuSrc}
                      width={34}
                      height={18}
                    />
                  );
                } else {
                  return null;
                }
              }}
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
                      <NavLink
                        isCollection
                        // className="relative"
                        href="/collection/maps-travel"
                        // isDropdownTrigger
                      >
                        N°1: Maps Travel
                        {/* <CollectionDropdown /> */}
                      </NavLink>
                      <NavLink href="/shop" zIndex>
                        Shop
                      </NavLink>
                      <NavLink href="/philosophy">Philosophy</NavLink>
                      <NavLink href="https://admin-shopify.bonhomme.lol/account">
                        Account
                      </NavLink>
                      <NavLink onClick={this.toggleBasket.bind(this)}>
                        Cart / {basketCount}
                      </NavLink>
                    </InlineGrid>
                  );
                } else {
                  return (
                    <img
                      onClick={this.toggleBasket.bind(this)}
                      src={cartSrc}
                      width={20}
                      height={20}
                    />
                  );
                }
              }}
            </MediaQuery>
          </InlineGrid>
        </PageWrap>
        <div className={mobileContainerClassName}>
          <div className={generalStyles.mobileInner}>
            <SimpleBar style={{ height: '100%' }}>
              <NavLink href="/collection/maps-travel">
                Collection N°1: MAPS, TRAVEL
              </NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/help">Help</NavLink>
              <NavLink href="/philosophy">Philosophy</NavLink>
              <NavLink href="/account">Account</NavLink>
              <Spacing size={20}>
                <Heading size="xxs" weight="semilight" center>
                  <Link href="/about#contact">Contact</Link>
                </Heading>
              </Spacing>
              <Spacing size={20}>
                <Heading size="xxs" weight="semilight" center>
                  <Link href="http://instagram.com">Instagram</Link>
                </Heading>
              </Spacing>
              <Spacing size={20}>
                <Heading size="xxs" weight="semilight" center>
                  <Link href="#">Newsletter</Link>
                </Heading>
              </Spacing>
              <Spacing size={20}>
                <Heading size="xxs" weight="semilight" center>
                  <Link href="/legals">Legals</Link>
                </Heading>
              </Spacing>
            </SimpleBar>
          </div>
        </div>
      </header>
    );
  }
}

export default withGlobalState(Header);

Header.propTypes = {
  isLight: PropTypes.bool,
  isHome: PropTypes.bool
};

Header.defaultProps = {
  isLight: false,
  isHome: false
};
