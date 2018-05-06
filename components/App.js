import { withRouter } from 'next/router';

import '../style.css';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

function App({ children, router }) {
  const pathname = router.pathname;

  return (
    <div className="root">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default withRouter(App);
