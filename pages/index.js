import withData from '../lib/withData';

import App from '../components/App';

function Home(data) {
  return (
    <App>
      <div>
        home
      </div>
    </App>
  );
}

export default withData(Home);