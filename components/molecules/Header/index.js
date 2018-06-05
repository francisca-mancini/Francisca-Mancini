import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';

import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Spacing from '../../atoms/Spacing';
import Link from '../../atoms/Link';
import PageWrap from '../../atoms/PageWrap';
import { Grid, GridItem, InlineGrid } from '../../atoms/Grid';

import LogoWhite from '../../../static/images/sprites/logo-white.svg';
import LogoBlack from '../../../static/images/sprites/logo-black.svg';

import generalStyles from './general.css';

export default function Header({ isLight }) {
  const headerClassName = classNames(generalStyles.header);
  const LogoTag = isLight ? LogoWhite : LogoBlack;
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
          <Link href="/" className="leading-none">
            <LogoTag width={243} height={16} />
          </Link>
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
