import { withRouter } from 'next/router';

import '../style.css';

import Header from './molecules/Header';
import Footer from './molecules/Footer';

function App({ children, router, headerLight }) {
  const pathname = router.pathname;

  return (
    <div className="root bg-black">
      <Header isLight={headerLight} />
      <div className="pt-80">{children}</div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
