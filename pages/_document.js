import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=IntersectionObserver" />
          <NextScript />
        </body>
      </html>
    );
  }
}
