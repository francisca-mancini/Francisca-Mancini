import Spacing from '../../../atoms/Spacing';
import { Grid, GridItem } from '../../../atoms/Grid';
import Paragraph from '../../../atoms/Paragraph';
import Heading from '../../../atoms/Heading';

import generalStyles from './general.css';

export default function Story() {
  return (
    <Spacing size={80} type="padding">
      <div className={generalStyles.story}>
        <Spacing size={80} type="padding">
          <Grid gap={30} align="center">
            <GridItem columnSize={6}>
              <Spacing size={30} position="b">
                <Heading size="s" weight="semilight" center>
                  Fragrance notes
                </Heading>
              </Spacing>
            </GridItem>
            <GridItem columnSize={6}>
              <Spacing size={30} position="b">
                <Heading size="s" weight="semilight" center>
                  Story
                </Heading>
              </Spacing>
              <Paragraph size="xl">
                {'     '}Bark is navigating down the river, between the temples
                of Luxor and Karnak, it stops in front of a small temple. As you
                walk in, there is a room to the left. A ray of light comes from
                the sky through a small window high up, cutting through incense
                smoke. There is an altar carved in stone, and to the right, on
                the floor there is an ancient vase. Inside this vase, set aside
                for ceremonial offerings, lays Atlantica, a magical ritual
                perfume made out of the most precious oils.
              </Paragraph>
            </GridItem>
          </Grid>
        </Spacing>
      </div>
    </Spacing>
  );
}
