import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';

import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Spacing from '../../atoms/Spacing';
import Link from '../../atoms/Link';
import PageWrap from '../../atoms/PageWrap';
import { Grid, GridItem, InlineGrid } from '../../atoms/Grid';

import LogoWhite from '../../../static/images/sprites/logo-white.svg';
import LogoBlack from '../../../static/images/sprites/logo-black.svg';
import LogoMiniWhite from '../../../static/images/sprites/logo-mini-white.svg';
import LogoMiniBlack from '../../../static/images/sprites/logo-mini-black.svg';
import CartWhite from '../../../static/images/sprites/cart-white.svg';
import CartBlack from '../../../static/images/sprites/cart-black.svg';
import MenuWhite from '../../../static/images/sprites/menu-white.svg';
import MenuBlack from '../../../static/images/sprites/menu-black.svg';

import generalStyles from './general.css';

export default function Header({ isLight }) {
  const headerClassName = classNames(generalStyles.header);
  const LogoTag = isLight ? LogoWhite : LogoBlack;
  const LogoMiniTag = isLight ? LogoMiniWhite : LogoMiniBlack;
  const CartTag = isLight ? CartWhite : CartBlack;
  const MenuTag = isLight ? MenuWhite : MenuBlack;
  const linkColor = isLight ? 'white' : 'black';

  const NavLink = ({ children, href, isDropdown, isDropdownTrigger }) => {
    const linkClassName = classNames({
      [generalStyles.dropdownTrigger]: isDropdownTrigger
    });

    return (
      <div className={linkClassName}>
        <Spacing size={isDropdown ? 5 : 10} position={isDropdown ? 'y' : 'x'}>
          <Link href={href}>
            <Heading
              tag="span"
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
            <MenuTag width={34} height={18} />
          </MediaQuery>
          <Link href="/" className="leading-none flex items-center">
            <MediaQuery minDeviceWidth={768} values={{ deviceWidth: 800 }}>
              {matches => {
                if (matches) {
                  return <LogoTag width={243} height={16} />;
                } else {
                  return <LogoMiniTag width={41} height={44} />;
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
                    <NavLink href="/shop">Shop</NavLink>
                    <NavLink href="/philosophy">Philosophy</NavLink>
                    <NavLink href="/account">Account</NavLink>
                    <NavLink href="/cart">Cart / 0</NavLink>
                  </InlineGrid>
                );
              } else {
                return <CartTag width={20} height={20} />;
              }
            }}
          </MediaQuery>
        </InlineGrid>
      </PageWrap>
    </header>
  );
}

Header.propTypes = {
  isLight: PropTypes.bool
};

Header.defaultProps = {
  isLight: false
};
