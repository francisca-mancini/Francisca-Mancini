import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem, InlineGrid } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';
import PageWrap from '../../../atoms/PageWrap';
import MaxWidth from '../../../atoms/MaxWidth';

import Description from '../Description';

import getProductStory from '../../../../lib/getProductStory';
import getProductNotes from '../../../../lib/getProductNotes';
import getProductBackground from '../../../../lib/getProductBackground';
import getFontSize from '../../../../lib/getFontSize';

import generalStyles from './general.module.css';

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
  const bg = product && getProductBackground(product);
  const storyStyles = {
    backgroundColor: bg
  };

  return (
    <Spacing size={80} position="bottom" type="padding">
      <div id="story" className={generalStyles.story} style={storyStyles}>
        <PageWrap>
          <Spacing size={80} type="padding">
            <Grid gap={[0, 0, 30]} align="center">
              <GridItem columnSize={[12, 12, 6]}>
                <Spacing size={30} position="b">
                  <Heading size={['xs', 's', 's']} weight="semilight" center>
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
              <GridItem columnSize={[12, 12, 6]}>
                <Spacing size={[100, 100, 0]} position="t">
                  <Spacing size={30} position="b">
                    <Heading size={['xs', 's', 's']} weight="semilight" center>
                      Story
                    </Heading>
                  </Spacing>
                  <Description description={story} />
                </Spacing>
              </GridItem>
            </Grid>
          </Spacing>
        </PageWrap>
      </div>
    </Spacing>
  );
}

export default Story;
