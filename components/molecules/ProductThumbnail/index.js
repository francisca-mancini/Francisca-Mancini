import Spacing from '../../atoms/Spacing';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';

import productImage from '../../../static/images/_temp/product.jpg';

export default function ProductThumbnail() {
  return (
    <div className="w-full px-20 flex items-center justify-center">
      <Link tag="div" href="/product">
        <div className="relative flex items-center justify-center mb-30">
          <img src={productImage} alt="yo" />
        </div>
        <div>
          <Spacing size={15}>
            <Heading uppercase size="xxxxs" center font="serif">
              Renaissance
            </Heading>
          </Spacing>
          <Paragraph weight="semilight" size="xs" center>
            Fragrance bottle, 100ml - £500
          </Paragraph>
        </div>
      </Link>
    </div>
  );
}
