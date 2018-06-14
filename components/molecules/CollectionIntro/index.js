import { Fragment } from 'react';

import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';
import Spacing from '../../atoms/Spacing';
import MaxWidth from '../../atoms/MaxWidth';

import WordHover from '../../molecules/WordHover';

import bubbleImage from '../../../static/images/_temp/bubble.jpg';
import bubbleImage2 from '../../../static/images/_temp/bubble2.jpg';

export default function CollectionIntro() {
  return (
    <Fragment>
      <Heading font="serif" weight="semilight" size="xl" center>
        Collection N˚1: Maps, Travel
      </Heading>
      <Spacing size={50}>
        <MaxWidth value={1000} center>
          <Paragraph weight="light" size="xxl" tag="div" center>
            This first collection maps out a fantastic{' '}
            <WordHover image={bubbleImage}>world</WordHover>. Each fragrance,
            inspired by a place and a time, embodies the spirit of that magical
            situation. This historical map is chronologically incorrect and
            these diverse moments in history coexist{' '}
            <WordHover image={bubbleImage}>here</WordHover> and{' '}
            <WordHover image={bubbleImage2}>now</WordHover>. Every time you wear
            these perfumes, ever time you{' '}
            <WordHover image={bubbleImage2}>layer</WordHover> them, you get to
            reconstitute the map, write your own story.
          </Paragraph>
        </MaxWidth>
      </Spacing>
      <div className="text-center">
        <Button href="/collection">Discover the collection</Button>
      </div>
    </Fragment>
  );
}
