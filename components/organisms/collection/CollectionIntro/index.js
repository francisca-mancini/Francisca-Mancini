import Heading from '../../../atoms/Heading';
import Spacing from '../../../atoms/Spacing';
import MaxWidth from '../../../atoms/MaxWidth';

import LearnMore from '../../../molecules/LearnMore';

import getCollectionTitle from '../../../../lib/getCollectionTitle';
import getCollectionDescription from '../../../../lib/getCollectionDescription';

import Description from '../Description';

export default function CollectionIntro({ collection }) {
  const title = getCollectionTitle(collection);
  const description = getCollectionDescription(collection);

  return (
    <div className="bg-white">
      <Heading font="jenson" size="xxxl" center>
        {title}
      </Heading>
      <Spacing size={50}>
        <MaxWidth value={1000} center>
          <Description description={description} />
        </MaxWidth>
      </Spacing>
      <div className="text-center opacity-50">
        <LearnMore>Discover the Fragrances</LearnMore>
      </div>
    </div>
  );
}
