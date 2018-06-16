import PageWrap from '../components/atoms/PageWrap';
import App from '../components/App';

import MaxWidth from '../components/atoms/MaxWidth';
import Spacing from '../components/atoms/Spacing';
import Paragraph from '../components/atoms/Paragraph';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';

import philosophyImage from '../static/images/_temp/philosophy.jpg';

export default function Philosophy() {
  return (
    <App>
      <PageWrap>
        <MaxWidth value={1000} center>
          <Spacing>
            <MaxWidth value={400} center>
              <img src={philosophyImage} alt="Philosophy" />
            </MaxWidth>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" font="jenson">
              Francisca Mancini, born in{' '}
              <span className="font-sans font-medium">Buenos Aires</span>, is an
              art advisor who works from the gallery she founded with her
              partner in London. Her clients who have long trusted her choices
              to build their art collections started to gain interest in the
              per- fumes she would wear. So perfume-making would be the way in
              which Francisca started to reflect her unique personality and
              inner worlds.
            </Paragraph>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" font="jenson">
              Core values of the brand: spirituality, individual identity,
              luxury, singularity, sophistication, elegance, artistic added
              value, this perfumes are meant to be like veil that you wrap
              yourself into as opposed wearing a scent that just lays there in
              from of you. I like things effortlessly chic and elegant.
              <br />
              <span className="font-sans font-medium">Perfume</span> as an aura,
              as a halo that surrounds the person and becomes part of their
              spirit. It is a physical manifestation of a state of mind. Not two
              people have the same spirit, you might have similar sprit, but
              individuality is the key.
            </Paragraph>
          </Spacing>

          <Spacing>
            <MaxWidth value={670} center>
              <Paragraph weight="medium" size="xxl" center>
                My fragrances are formulated with the intention of being
                layered.
              </Paragraph>
            </MaxWidth>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" font="jenson">
              Even if you wear jeans every day, you might want to wear different
              colours. Same with perfume; my fragrances are formulated with the
              intention of being layered. Even if you wear the same ones every
              day, the balance can be fine-tuned. You can spray several at once,
              and keep on layering throughout the day, or you make an{' '}
              <span className="font-sans font-medium">appointment</span> with me
              and have your balance formu- lated for you.In this way you might
              want to feel in one way in the{' '}
              <span className="font-sans font-medium">morning</span> and
              slightly different at night. In this regard there is magical
              aspect as well, that is activated by whoever wears the fragrance
              when they layer them.
            </Paragraph>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" weight="medium" center>
              A fragrance is an instant.<br />
              A memory,<br />
              a place, a voyage.
            </Paragraph>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" font="jenson">
              A fragrance is an instant. A memory, a place, a voyage. They are a
              dream, in a sense that they trans-port you to whatever that{' '}
              <span className="font-sans font-medium">fragrance</span> triggers
              on you. I like to make perfumes for imagined situations, for
              places.
            </Paragraph>
          </Spacing>

          <Spacing>
            <Paragraph size="xxl" font="jenson">
              These fragances are smart, sophisticated and effortlessly chic.
              Stylish and very high quality,{' '}
              <span className="font-sans font-medium">jewel</span> like.
              Opposite to a dispos-able and fast fashion style. If I had to
              think a parallel in fash-ion but in spirit of the brand, I would
              say somewhere in between{' '}
              <span className="font-sans font-medium">Kiton</span> and{' '}
              <span className="font-sans font-medium">Rubinacci</span> Which
              started out as small, family run, ultra high quality and incred-
              ibly stylish brands that have a timeless approach as opposed to
              seasonal approach to clothing.
            </Paragraph>
          </Spacing>

          <Spacing size={20}>
            <Heading tag="h3" size="l" weight="semilight">
              Francisca Mancini
            </Heading>
          </Spacing>
          <Spacing size={20}>
            <Heading tag="h3" size="l" weight="semilight">
              Date
            </Heading>
          </Spacing>

          <Spacing>
            <div className="text-center">
              <Button href="/">Discover the Collection</Button>
            </div>
          </Spacing>
        </MaxWidth>
      </PageWrap>
    </App>
  );
}
