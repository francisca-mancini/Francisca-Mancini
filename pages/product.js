import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';

import Hero from '../components/organisms/product/Hero';
import YouMightLike from '../components/organisms/product/YouMightLike';
import Story from '../components/organisms/product/Story';

export default function Product() {
  return (
    <App hasTopPad={false}>
      <PageWrap>
        <Hero />
      </PageWrap>
      <Story />
      <PageWrap>
        <YouMightLike />
      </PageWrap>
    </App>
  );
}
