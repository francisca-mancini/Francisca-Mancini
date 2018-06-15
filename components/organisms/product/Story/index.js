import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem, InlineGrid } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import PageWrap from '../../../atoms/PageWrap';
import MaxWidth from '../../../atoms/MaxWidth';

import generalStyles from './general.module.css';

const Note = ({ label, children }) => {
  return (
    <Spacing size={10}>
      <MaxWidth value={500} center>
        <InlineGrid justify="start" align="center">
          <div className={generalStyles.noteLeft}>
            <Heading size="xxl" uppercase>
              {label}
            </Heading>
          </div>
          <div className={generalStyles.noteRight}>
            <Heading size="xxl" font="jenson">
              {children}
            </Heading>
          </div>
        </InlineGrid>
      </MaxWidth>
    </Spacing>
  );
};

export default function Story() {
  return (
    <Spacing size={80} type="padding">
      <div className={generalStyles.story}>
        <PageWrap>
          <Spacing size={80} type="padding">
            <Grid gap={30} align="center">
              <GridItem columnSize={6}>
                <Spacing size={30} position="b">
                  <Heading size="s" weight="semilight" center>
                    Fragrance notes
                  </Heading>
                </Spacing>

                <Note label="Top">Ambrette / Coconut water</Note>
                <Note label="Heart">Patchouli Leaves</Note>
                <Note label="Base">Coco Absolu / Wold musk</Note>
              </GridItem>
              <GridItem columnSize={6}>
                <Spacing size={30} position="b">
                  <Heading size="s" weight="semilight" center>
                    Story
                  </Heading>
                </Spacing>
                <Paragraph font="jenson" size="xl">
                  {'     '}Bark is navigating down the river, between the
                  temples of Luxor and Karnak, it stops in front of a small
                  temple. As you walk in, there is a room to the left. A ray of
                  light comes from the sky through a small window high up,
                  cutting through incense smoke. There is an altar carved in
                  stone, and to the right, on the floor there is an ancient
                  vase. Inside this vase, set aside for ceremonial offerings,
                  lays Atlantica, a magical ritual perfume made out of the most
                  precious oils.
                </Paragraph>
              </GridItem>
            </Grid>
          </Spacing>
        </PageWrap>
      </div>
    </Spacing>
  );
}
