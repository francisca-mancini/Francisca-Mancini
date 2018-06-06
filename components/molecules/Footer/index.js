import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';

import PageWrap from '../../atoms/PageWrap';
import { InlineGrid } from '../../atoms/Grid';
import Link from '../../atoms/Link';
import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';

import logoWhite from '../../../static/images/sprites/logo-white.svg';
import logoBlack from '../../../static/images/sprites/logo-black.svg';
import logoMini from '../../../static/images/sprites/logo-mini-center.svg';

import generalStyles from './general.css';

const cx = classNames.bind({ ...generalStyles });

export default function Footer({ isLight }) {
  const footerClassName = cx('footer', {
    isLight: isLight,
    isDark: !isLight
  });
  const logoSrc = isLight ? logoWhite : logoBlack;
  const linkColor = isLight ? 'white' : 'black';

  const NavLink = ({ children, href }) => {
    return (
      <Spacing size={10} position="x">
        <Link href={href}>
          <Heading
            tag="span"
            uppercase
            size="xxxs"
            weight="semilight"
            tracking="wide"
            color={linkColor}
          >
            {children}
          </Heading>
        </Link>
      </Spacing>
    );
  };

  return (
    <footer className={footerClassName}>
      <PageWrap>
        <InlineGrid direction={['col', 'col', 'row']}>
          <Link href="/" className="leading-none flex items-center">
            <MediaQuery minDeviceWidth={768} values={{ deviceWidth: 800 }}>
              {matches => {
                if (matches) {
                  return <img src={logoSrc} width={243} height={16} />;
                } else {
                  return <img src={logoMini} width={156} height={45} />;
                }
              }}
            </MediaQuery>
          </Link>
          <InlineGrid>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="https://instagram.com">Instagram</NavLink>
            <NavLink href="/help">Help</NavLink>
            <NavLink href="/newsletter">Newsletter</NavLink>
            <NavLink href="/legals">Legals</NavLink>
          </InlineGrid>
        </InlineGrid>
      </PageWrap>
    </footer>
  );
}

Footer.propTypes = {
  isLight: PropTypes.bool
};

Footer.defaultProps = {
  isLight: false
};
