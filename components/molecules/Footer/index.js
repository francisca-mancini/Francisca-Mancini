import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';

import PageWrap from '../../atoms/PageWrap';
import { InlineGrid } from '../../atoms/Grid';
import Link from '../../atoms/Link';
import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';

import logoWhite from '../../../static/images/sprites/logo-white.svg';
import logoBlack from '../../../static/images/sprites/logo-black.svg';
import logoMini from '../../../static/images/sprites/logo-mini-center.svg';

import generalStyles from './general.module.css';

import crossIcon from '../../../static/images/sprites/close.svg';
import Paragraph from '../../atoms/Paragraph';

const cx = classNames.bind({ ...generalStyles });

export default class Footer extends PureComponent {
  constructor() {
    super();

    this.state = {
      newsletterOpen: false
    };

    this.toggleNewsletter = this.toggleNewsletter.bind(this);
  }

  toggleNewsletter() {
    this.setState(
      {
        newsletterOpen: !this.state.newsletterOpen
      },
      () => {
        scroll.scrollToBottom(200);
      }
    );
  }

  render() {
    const { isLight } = this.props;
    const { newsletterOpen } = this.state;
    const footerClassName = cx('footer', {
      isLight: isLight,
      isDark: !isLight,
      footerOpen: newsletterOpen
    });
    const newsletterClassName = cx('newsletter');
    const navItemClassName = cx('navItem', {
      navItemLight: isLight,
      navItemDark: !isLight
    });
    const logoSrc = isLight ? logoWhite : logoBlack;

    const NavLink = ({ children, href, ...props }) => {
      const LinkTag = href ? Link : 'span';
      const linkProps = {
        href: href || null,
        className: 'cursor-pointer',
        ...props
      };

      return (
        <Spacing size={10} position="x">
          <LinkTag {...linkProps}>
            <Heading
              tag="span"
              uppercase
              size="xxxs"
              font="alternate"
              weight="semilight"
              tracking="wide"
              className={navItemClassName}
            >
              {children}
            </Heading>
          </LinkTag>
        </Spacing>
      );
    };

    return (
      <footer className={footerClassName}>
        <PageWrap className={generalStyles.pageWrap}>
          <InlineGrid direction={['col', 'col', 'row']}>
            <Spacing size={[20, 20, 0]} position="b">
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
            </Spacing>
            <InlineGrid className="flex-wrap" justify="center">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/about#contact">Contact</NavLink>
              <NavLink href="https://instagram.com">Instagram</NavLink>
              <NavLink href="/help">Help</NavLink>
              <NavLink onClick={this.toggleNewsletter}>Newsletter</NavLink>
              <NavLink href="/legals">Legals</NavLink>
            </InlineGrid>
          </InlineGrid>
        </PageWrap>
        <div className={newsletterClassName}>
          <Spacing size={[40, 40, 60]}>
            <PageWrap className="max-w-full flex flex-col items-center justify-center">
              <div
                className={generalStyles.cross}
                onClick={this.toggleNewsletter}
              >
                <img src={crossIcon} alt="close newsletter" />
              </div>
              <Spacing size={[20, 20, 40]}>
                <Paragraph size={['m', 'm', 'l']} weight="semilight">
                  Subscribe to the Newsletter to receive the latest news.
                </Paragraph>
              </Spacing>
              <div className="flex md-flex-row flex-col items-center w-full md-w-auto">
                <Spacing size={[0, 0, 20]} position="x" className="w-full">
                  <input
                    className={generalStyles.input}
                    placeholder="Enter email"
                  />
                </Spacing>
                <Spacing size={[10, 10, 0]} position="y" className="w-full">
                  <Button className="w-full md-w-auto inline-block text-center">
                    Sign up
                  </Button>
                </Spacing>
              </div>
            </PageWrap>
          </Spacing>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  isLight: PropTypes.bool
};

Footer.defaultProps = {
  isLight: false
};
