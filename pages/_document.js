import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  get helmetJsx() {
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title="Francisca Mancini"
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            name: 'description',
            content:
              'Francisca Mancini was born in Buenos Aires where she became an art historian, before moving to London. Following her passion, she began training in perfumery and this rapidly became the way in which Francisca started to reflect her personality and inner world.'
          },
          { property: 'og:title', content: 'Francisca Mancini' }
        ]}
      />
    );
  }

  render() {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
          {/* <meta name="robots" content="index,follow"> */}
          <link rel="icon" type="image/png" href="/static/images/favicon.png" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=IntersectionObserver" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
