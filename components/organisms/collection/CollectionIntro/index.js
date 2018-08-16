import { Link } from 'react-scroll';

import Heading from '../../../atoms/Heading';
import Spacing from '../../../atoms/Spacing';
import MaxWidth from '../../../atoms/MaxWidth';
import Button from '../../../atoms/Button';

import LearnMore from '../../../molecules/LearnMore';

import getCollectionTitle from '../../../../lib/getCollectionTitle';
import getCollectionDescription from '../../../../lib/getCollectionDescription';
import getCollectionHandle from '../../../../lib/getCollectionHandle';

import Description from '../Description';

import generalStyles from './general.module.css';

export default function CollectionIntro({ collection, isHome, to }) {
  const title = getCollectionTitle(collection);
  const description = getCollectionDescription(collection);
  const handle = getCollectionHandle(collection);

  return (
    <div>
      <Heading font="jenson" size="xxxl" center>
        {title}
      </Heading>
      <Spacing size={50}>
        <MaxWidth value={1000} center>
          <Description description={description} />
        </MaxWidth>
      </Spacing>

      {isHome ? (
        <div className="text-center">
          <Button href={`/collection/${handle}`}>
            Discover the collection
          </Button>
        </div>
      ) : (
        <div className={generalStyles.learnmore}>
          <Link
            to={to}
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <LearnMore>Discover the Fragrances</LearnMore>
          </Link>
        </div>
      )}
    </div>
  );
}
