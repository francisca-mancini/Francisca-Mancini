import generalStyles from './general.css';

import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

export default function Header() {
  return (
    <header className={generalStyles.header}>
      <Heading size="xl" uppercase>
        header
      </Heading>
      <Paragraph>
        Hi there i'm a paragraph Hi there i'm a paragraph Hi there i'm a
        paragraph Hi there i'm a paragraph Hi there i'm a paragraph Hi there i'm
        a paragraph Hi there i'm a paragraph Hi there i'm a paragraph
      </Paragraph>
    </header>
  );
}
