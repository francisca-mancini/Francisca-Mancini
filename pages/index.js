import withData from '../lib/withData';

import App from '../components/App';
import Shop from '../components/molecules/Shop';

import logo from '../static/images/logo.jpg';

function Home(data) {
  return (
    <App>
      <img src={logo} alt="logo" />
      <Shop />
      <div>
        home
      </div>
    </App>
  );
}


export default withData(Home);