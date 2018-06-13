import App from '../components/App';

import Hero from '../components/organisms/product/Hero';
import PageWrap from '../components/atoms/PageWrap';

export default function Product() {
  return (
    <App hasTopPad={false}>
      <PageWrap>
        <Hero />
      </PageWrap>
    </App>
  );
}
