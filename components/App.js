import { withRouter } from 'next/router';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

function App({ children, router }) {
  const pathname = router.pathname;

  return (
    <div className="root">
      <Header />
      {children}
      <Footer />
      <style jsx global>{`
        * {
          font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
            'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
            monospace, serif;
        }
        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default withRouter(App);
