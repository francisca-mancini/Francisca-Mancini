import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';

import Shop from '../components/molecules/Shop';

function Home(data) {
  return (
    <App headerLight={true}>
      <PageWrap>
        <Shop />
        <div>home</div>
      </PageWrap>
    </App>
  );
}

export default withData(Home);
