import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-scroll';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Heading from '../components/atoms/Heading';
import Spacing from '../components/atoms/Spacing';
import AtomLink from '../components/atoms/Link';

import Basket from '../components/organisms/Basket';

import withData from '../lib/withData';
import { checkoutQuery, checkout } from '../lib/checkout';
import { Grid, GridItem } from '../components/atoms/Grid';
import Paragraph from '../components/atoms/Paragraph';

class Help extends PureComponent {
  render() {
    return (
      <App>
        <Basket onCheckout={this.handleCheckout} />
        <PageWrap>
          <Spacing size={60} type="padding">
            <Grid gap={20} align="start">
              <GridItem columnSize={[0, 0, 3]}>
                <div className="hidden md-block">
                  <Spacing size={10}>
                    <Link
                      className="cursor-pointer"
                      to="help"
                      spy={true}
                      smooth={true}
                      duration={500}
                    >
                      <Heading size="xxxs" uppercase font="serif">
                        Help
                      </Heading>
                    </Link>
                  </Spacing>
                  <Spacing size={10}>
                    <Link
                      className="cursor-pointer"
                      to="shipping"
                      spy={true}
                      smooth={true}
                      duration={500}
                    >
                      <Heading size="xxxs" uppercase font="serif">
                        shipping &amp; returns
                      </Heading>
                    </Link>
                  </Spacing>
                </div>
              </GridItem>
              <GridItem columnSize={[12, 12, 9]}>
                <div id="help">
                  <Spacing size={30}>
                    <Heading
                      tag="h3"
                      center
                      size={['m', 'l', 'xxl']}
                      font="serif"
                    >
                      Help
                    </Heading>
                  </Spacing>
                  <Paragraph
                    indent
                    size={['m', 'l', 'xxl']}
                    font="jenson"
                    weight="light"
                  >
                    Please email us at{' '}
                    <AtomLink
                      className="inline font-sans font-medium"
                      href="mailto:contact@email.com"
                    >
                      contact@email
                    </AtomLink>{' '}
                    if you have any questions, or contact us by phone on{' '}
                    <AtomLink
                      className="inline font-sans font-medium"
                      href="tel:+440765647564"
                    >
                      +440765647564
                    </AtomLink>.
                  </Paragraph>
                </div>

                <Spacing size={120} position="t">
                  <div id="shipping">
                    <Spacing size={30}>
                      <Heading
                        tag="h3"
                        center
                        size={['m', 'l', 'xxl']}
                        font="serif"
                      >
                        Shipping &amp; returns
                      </Heading>
                    </Spacing>
                    <Paragraph
                      indent
                      size={['m', 'l', 'xxl']}
                      font="jenson"
                      weight="light"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis vitae diam ante. Aenean ornare dolor ac massa
                      porttitor placerat. Nunc aliquam sodales nisi vel rutrum.
                    </Paragraph>

                    <Spacing position="t">
                      <Heading
                        className="opacity-75"
                        size={['xs', 'l']}
                        weight="semilight"
                      >
                        Standard Delivery Services
                      </Heading>
                    </Spacing>
                    <Spacing size={20} position="t">
                      <Paragraph
                        size={['m', 'l', 'xxl']}
                        font="jenson"
                        weight="light"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis vitae diam ante. Aenean ornare dolor ac massa
                        porttitor placerat. Nunc aliquam sodales nisi vel
                        rutrum. Nunc ultricies nisl nec eros vulputate
                        porttitor. Suspendisse volutpat, massa ac ultrices
                        ornare, augue nunc suscipit ligula, sollicitudin cursus
                        urna metus quis diam. Aliquam erat volutpat. Donec nec
                        sollicitudin metus. Aliquam ac ipsum vel ante eleifend
                        suscipit.
                      </Paragraph>
                    </Spacing>

                    <Spacing position="t">
                      <Heading
                        className="opacity-75"
                        size={['xs', 'l']}
                        weight="semilight"
                      >
                        Freight
                      </Heading>
                    </Spacing>
                    <Spacing size={20} position="t">
                      <Paragraph
                        size={['m', 'l', 'xxl']}
                        font="jenson"
                        weight="light"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis vitae diam ante. Aenean ornare dolor ac massa
                        porttitor placerat. Nunc aliquam sodales nisi vel
                        rutrum. Nunc ultricies nisl nec eros vulputate
                        porttitor. Suspendisse volutpat, massa ac ultrices
                        ornare, augue nunc suscipit ligula, sollicitudin cursus
                        urna metus quis diam. Aliquam erat volutpat. Donec nec
                        sollicitudin metus. Aliquam ac ipsum vel ante eleifend
                        suscipit.
                      </Paragraph>
                    </Spacing>

                    <Spacing position="t">
                      <Heading
                        className="opacity-75"
                        size={['xs', 'l']}
                        weight="semilight"
                      >
                        Return policy
                      </Heading>
                    </Spacing>
                    <Spacing size={20} position="t">
                      <Paragraph
                        size={['m', 'l', 'xxl']}
                        font="jenson"
                        weight="light"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis vitae diam ante. Aenean ornare dolor ac massa
                        porttitor placerat. Nunc aliquam sodales nisi vel
                        rutrum. Nunc ultricies nisl nec eros vulputate
                        porttitor. Suspendisse volutpat, massa ac ultrices
                        ornare, augue nunc suscipit ligula, sollicitudin cursus
                        urna metus quis diam. Aliquam erat volutpat. Donec nec
                        sollicitudin metus. Aliquam ac ipsum vel ante eleifend
                        suscipit.
                      </Paragraph>
                    </Spacing>
                  </div>
                </Spacing>
              </GridItem>
            </Grid>
          </Spacing>
        </PageWrap>
      </App>
    );
  }
}

const HelpWithDataAndMutation = compose(
  graphql(checkoutQuery, { name: 'checkoutQuery' })
)(Help);

export default withData(HelpWithDataAndMutation);
