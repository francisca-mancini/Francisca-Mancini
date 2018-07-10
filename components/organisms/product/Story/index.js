import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem, InlineGrid } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import PageWrap from '../../../atoms/PageWrap';
import MaxWidth from '../../../atoms/MaxWidth';

import getProductStory from '../../../../lib/getProductStory';
import getProductNotes from '../../../../lib/getProductNotes';

import generalStyles from './general.module.css';

const Note = ({ label, children }) => {
  return (
    <Spacing size={10}>
      <MaxWidth value={500} center>
        <InlineGrid justify="start" align="center">
          <div className={generalStyles.noteLeft}>
            <Heading size="xl" uppercase>
              {label}
            </Heading>
          </div>
          <div className={generalStyles.noteRight}>
            <Heading size="xl" font="jenson">
              {children}
            </Heading>
          </div>
        </InlineGrid>
      </MaxWidth>
    </Spacing>
  );
};

function Story({ product }) {
  const story = product && getProductStory(product);
  const notes = product && getProductNotes(product);

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

                {notes &&
                  notes.length &&
                  notes.map((item, index) => {
                    return (
                      <Note key={index} label={item.label}>
                        {item.note}
                      </Note>
                    );
                  })}
              </GridItem>
              <GridItem columnSize={6}>
                <Spacing size={30} position="b">
                  <Heading size="s" weight="semilight" center>
                    Story
                  </Heading>
                </Spacing>
                <Paragraph font="jenson" size="xl">
                  {story}
                </Paragraph>
              </GridItem>
            </Grid>
          </Spacing>
        </PageWrap>
      </div>
    </Spacing>
  );
}

export default Story;
