import generalStyles from './general.css';

import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';

export default function Header() {
  return (
    <header className={generalStyles.header}>
      <Heading size="xl" uppercase>
        header
      </Heading>
      <Button
        size="s"
        onClick={e => {
          console.log(e);
        }}
      >
        Discover the Collection
      </Button>
    </header>
  );
}
