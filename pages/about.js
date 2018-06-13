import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';
import Spacing from '../components/atoms/Spacing';
import MaxWidth from '../components/atoms/MaxWidth';
import Link from '../components/atoms/Link';

function About(data) {
  const maxWidth = 930;

  return (
    <App>
      <PageWrap>
        <div id="about">
          <Spacing size={60} type="padding">
            <MaxWidth value={maxWidth} center>
              <Heading tag="h3" center size="xxl" font="serif">
                About
              </Heading>
              <Spacing size={40} position="t">
                <Paragraph size="xxl" weight="semilight">
                  Francisca Mancini, born in Buenos Aires, is an art advisor who
                  works from the gallery she founded with her partner in London.
                  Her clients who have long trusted her choices to build their
                  art collections started to gain interest in the per-fumes she
                  would wear. So perfume-making would be the way in which
                  Francisca started to reflect her unique personality and inner
                  worlds.
                </Paragraph>
              </Spacing>
            </MaxWidth>
          </Spacing>
        </div>

        <div id="contact">
          <Spacing size={60} type="padding">
            <MaxWidth value={maxWidth} center>
              <Heading tag="h3" center size="xxl" font="serif">
                Contact
              </Heading>
              <Spacing size={40} position="t">
                <Paragraph size="xxl" weight="semilight">
                  Francisca Mancini, born in Buenos Aires, is an art advisor who
                  works from the gallery she founded with her partner in London.
                  Her clients who have long trusted her choices to build their
                  art collections started to gain interest in the per-fumes she
                  would wear. So perfume-making would be the way in which
                  Francisca started to reflect her unique personality and inner
                  worlds.
                </Paragraph>
              </Spacing>
            </MaxWidth>
          </Spacing>
        </div>

        <div id="stocklist">
          <Spacing size={60} type="padding">
            <MaxWidth value={maxWidth} center>
              <Heading tag="h3" center size="xxl" font="serif">
                Stocklist
              </Heading>
              <Spacing size={40} position="t">
                <Paragraph size="xxl" weight="semilight">
                  Liberty London
                </Paragraph>
                <Paragraph size="xxl" weight="semilight">
                  Regent St, Carnaby, London W1B 5AH
                </Paragraph>
                <Paragraph size="xxl" weight="semilight">
                  +44 20 7734 1234
                </Paragraph>
                <Paragraph size="xxl">
                  <Link href="http://google.com">Visit website</Link>
                </Paragraph>
              </Spacing>
              <Spacing size={40} position="t">
                <Paragraph size="xxl" weight="semilight">
                  Dover street Market
                </Paragraph>
                <Paragraph size="xxl" weight="semilight">
                  Regent St, Carnaby, London W1B 5AH
                </Paragraph>
                <Paragraph size="xxl" weight="semilight">
                  +44 20 7734 1234
                </Paragraph>
                <Paragraph size="xxl">
                  <Link href="http://google.com">Visit website</Link>
                </Paragraph>
              </Spacing>
            </MaxWidth>
          </Spacing>
        </div>

        <Spacing size={60} type="padding">
          <MaxWidth value={maxWidth} center>
            <Heading tag="h3" center size="xxl" font="serif">
              Press
            </Heading>
            <Spacing size={40} position="t">
              <Paragraph size="xxl" weight="semilight">
                Francisca Mancini, born in Buenos Aires, is an art advisor who
                works from the gallery she founded with her partner in London.
                Her clients who have long trusted her choices.
              </Paragraph>
            </Spacing>

            <Spacing>
              <Spacing position="b" size={30}>
                <Heading weight="semilight" size="xl">
                  January 14th
                </Heading>
              </Spacing>
              <Spacing position="b" size={10}>
                <Heading weight="semilight" size="xxl" tag="h4">
                  Article description
                </Heading>
              </Spacing>
              <Heading size="xxl">
                <Link href="http://google.com">Read Article</Link>
              </Heading>
            </Spacing>

            <Spacing>
              <Spacing position="b" size={30}>
                <Heading weight="semilight" size="xl">
                  January 14th
                </Heading>
              </Spacing>
              <Spacing position="b" size={10}>
                <Heading weight="semilight" size="xxl" tag="h4">
                  Article description
                </Heading>
              </Spacing>
              <Heading size="xxl">
                <Link href="http://google.com">Read Article</Link>
              </Heading>
            </Spacing>
          </MaxWidth>
        </Spacing>
      </PageWrap>
    </App>
  );
}

export default withData(About);
