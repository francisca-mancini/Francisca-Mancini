import { Fragment } from 'react';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import Button from '../../../atoms/Button';
import Spacing from '../../../atoms/Spacing';
import MaxWidth from '../../../atoms/MaxWidth';

import WordHover from '../../../molecules/WordHover';
import LearnMore from '../../../molecules/LearnMore';

import bubbleImage from '../../../../static/images/_temp/bubble.jpg';
import bubbleImage2 from '../../../../static/images/_temp/bubble2.jpg';

export default function CollectionIntro() {
  return (
    <div className="bg-white">
      <Heading font="jenson" size="xxxl" center>
        Collection N˚1: Maps, Travel
      </Heading>
      <Spacing size={50}>
        <MaxWidth value={1000} center>
          <Paragraph
            font="jenson"
            weight="light"
            size="xxl"
            tag="div"
            justified
          >
            Like the{' '}
            <WordHover image={bubbleImage}>stars guided sailors</WordHover> for
            thousands of years, these perfumes will guide you through a{' '}
            <WordHover image={bubbleImage2}>magical</WordHover> journey. From
            the scent of the dense, deep red velvet, covering the walls of the
            borgo of an art avid warrior duche in{' '}
            <WordHover image={bubbleImage}>Urbino in the 1500’s</WordHover>, to
            the true pearls of the south sea: the{' '}
            <WordHover image={bubbleImage}>Ama</WordHover>, or female-only pearl
            divers, who still fish pearls off the coasts of{' '}
            <WordHover image={bubbleImage2}>Japan's islands</WordHover>{' '}
            following the rules established thousands of years ago, passing
            along a tradition that has survived for generations. This collection
            invites you to embark in a personal journey, visiting these{' '}
            <WordHover image={bubbleImage}>magical places</WordHover> and making
            them you own.
          </Paragraph>
        </MaxWidth>
      </Spacing>
      <div className="text-center opacity-50">
        <LearnMore>Discover the Fragrances</LearnMore>
      </div>
    </div>
  );
}
