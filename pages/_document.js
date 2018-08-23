import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Francisca Mancini</title>
          {/* <meta name="robots" content="index,follow"> */}
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
