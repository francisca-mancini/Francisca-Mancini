import withData from '../lib/withData';

import App from '../components/App';

import PageWrap from '../components/atoms/PageWrap';

import Shop from '../components/molecules/Shop';

import logo from '../static/images/logo.jpg';

function About(data) {
  return (
    <App>
      <PageWrap>
        <img src={logo} alt="logo" />
        <Shop />
        <div>About</div>
      </PageWrap>
    </App>
  );
}

export default withData(About);
