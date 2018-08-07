import { Grid, GridItem, InlineGrid } from '../../atoms/Grid';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Spacing from '../../atoms/Spacing';
import AtomLink from '../../atoms/Link';
import ProductThumbnail from '../../molecules/ProductThumbnail';

import getProductPrice from '../../../lib/getProductPrice';
import getProductTitle from '../../../lib/getProductTitle';

export default function BasketItem({ product }) {
  return (
    <Spacing size={25} position="x" type="padding">
      <Spacing size={40}>
        <Grid align="center" gap={10}>
          <GridItem columnSize={4}>
            <ProductThumbnail hasNoInfo product={product} />
          </GridItem>
          <GridItem columnSize={8}>
            <InlineGrid>
              <Heading font="serif" size="xxxxs" uppercase>
                {getProductTitle(product)}
              </Heading>
              <Heading font="sans" size="s">
                £{getProductPrice(product)}
              </Heading>
            </InlineGrid>
            <Spacing size={10} position="t">
              <Paragraph size="xs">
                Lorem ipsum kg dfkjgh kjhg fgj hgjkdf gk
              </Paragraph>
            </Spacing>
            <Spacing size={5}>
              <Paragraph size="xs">Quantity</Paragraph>
            </Spacing>
            <InlineGrid justify="end">
              <Paragraph size="xs">
                <AtomLink underline className="opacity-75">
                  Remove item
                </AtomLink>
              </Paragraph>
            </InlineGrid>
          </GridItem>
        </Grid>
      </Spacing>
    </Spacing>
  );
}
