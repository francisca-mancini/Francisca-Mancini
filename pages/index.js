import withData from '../lib/withData';

import App from '../components/App';
import CollectionIntro from '../components/organisms/CollectionIntro';

function Home(data) {
  return (
    <App>
      <CollectionIntro />
      <div>
        home
      </div>
    </App>
  );
}


export default withData(Home);