const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[folder][local]' // hack to not add hash on ./style.css import
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(mp3|wav|mp4|ogg|webm)$/,
      loader: 'url-loader',
      options: Object.assign(
        {},
        {
          emitFile: !isServer,
          limit: 8192,
          name: `static/[path][${dev ? 'name' : 'hash'}].[ext]`,
          publicPath: `/_next/`
        }
      )
    });

    return config;
  }
});
