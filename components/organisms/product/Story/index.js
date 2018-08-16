import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem, InlineGrid } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import PageWrap from '../../../atoms/PageWrap';
import MaxWidth from '../../../atoms/MaxWidth';

import Description from '../Description';

import getProductStory from '../../../../lib/getProductStory';
import getProductNotes from '../../../../lib/getProductNotes';
import getFontSize from '../../../../lib/getFontSize';

import generalStyles from './general.module.css';
import getCollectionDescription from '../../../../lib/getCollectionDescription';

const Note = ({ label, children }) => {
  return (
    <Spacing size={10} type="padding">
      <MaxWidth value={500} center>
        <InlineGrid justify="start" align="center">
          <div className={generalStyles.noteLeft}>
            <Heading size={getFontSize('xl')} uppercase>
              {label}
            </Heading>
          </div>
          <div className={generalStyles.noteRight}>
            <Heading size={getFontSize('xl')} font="jenson">
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

  console.log(story);

  return (
    <Spacing size={80} position="bottom" type="padding">
      <div id="story" className={generalStyles.story}>
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
                <Description description={story} />
              </GridItem>
            </Grid>
          </Spacing>
        </PageWrap>
      </div>
    </Spacing>
  );
}

export default Story;
