import withData from '../lib/withData';

import App from '../wrongpath/components/App';

function About(data) {
  return (
    <App>
      <div>
        About
      </div>
    </App>
  );
}

export default withData(About);