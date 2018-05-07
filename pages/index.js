import withData from '../lib/withData';

import App from '../components/App';
import Shop from '../components/molecules/Shop';

function Home(data) {
  return (
    <App>
      <Shop />
      <div>
        home
      </div>
    </App>
  );
}


export default withData(Home);