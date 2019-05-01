import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import jsonp from 'jsonp';
import queryString from 'query-string';
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
      newsletterOpen: false,
      newsletterSent: null
    };

    this.toggleNewsletter = this.toggleNewsletter.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.emailRef.value;

    jsonp(
      `//franciscamancini.us19.list-manage.com/subscribe/post-json?u=ab8ed04bf1e270d137701bf40&amp;id=7d4a26c1a9&EMAIL=${email}`,
      { param: 'c' },
      (err, data) => {
        if (data.result === 'success') {
          this.setState({
            newsletterSent: true
          });
        } else {
          this.setState({
            newsletterSent: false
          });
        }
      }
    );
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
    const { newsletterOpen, newsletterSent } = this.state;
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
                <img
                  className="hidden md-block"
                  src={logoSrc}
                  width={243}
                  height={16}
                />
                <img
                  className="block md-hidden"
                  src={logoMini}
                  width={156}
                  height={45}
                />
              </Link>
            </Spacing>
            <InlineGrid className="flex-wrap" justify="center">
              <NavLink href="/about#contact">Contact</NavLink>
              <NavLink href="https://www.instagram.com/franciscamancini/">
                Instagram
              </NavLink>
              <NavLink href="/help">Help</NavLink>
              <NavLink onClick={this.toggleNewsletter}>Newsletter</NavLink>
              <NavLink href="/terms">Legals</NavLink>
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
                {newsletterSent === null ? (
                  <form
                    method="get"
                    onSubmit={this.handleSubmit.bind(this)}
                    name="mc-embedded-subscribe-form"
                    className="flex md-flex-row flex-col items-center w-full md-w-auto"
                  >
                    <Spacing size={[0, 0, 20]} position="x" className="w-full">
                      <input
                        ref={ref => {
                          this.emailRef = ref;
                        }}
                        name="EMAIL"
                        type="email"
                        required
                        className={generalStyles.input}
                        placeholder="Enter email"
                      />
                      {/* <input style={{ position: 'absolute', opacity: 0 }} type="text" name="b_ab8ed04bf1e270d137701bf40_7d4a26c1a9" tabindex="-1" value=""></input> */}
                    </Spacing>
                    <Spacing
                      size={[10, 10, 0]}
                      position="y"
                      className="w-full inline-block"
                    >
                      <Button
                        id="mc-embedded-subscribe"
                        tag="button"
                        type="submit"
                        className="w-full md-w-auto inline-block text-center"
                      >
                        Sign up
                      </Button>
                    </Spacing>
                  </form>
                ) : (
                  <span className="opacity-50">
                    <Paragraph size={['m', 'm', 'l']} weight="semilight">
                      {newsletterSent === true
                        ? 'Thank your for subscibring, we will be in touch via mail.'
                        : 'Something went wrong please try again later.'}
                    </Paragraph>
                  </span>
                )}
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
