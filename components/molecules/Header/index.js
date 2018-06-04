import generalStyles from './general.css';

import Heading from '../../atoms/Heading';

export default function Header() {
  return (
    <header className={generalStyles.header}>
      <Heading size="xl" uppercase>header</Heading>
    </header>
  )
}