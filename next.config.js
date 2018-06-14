const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssLoaderConfig = require('@zeit/next-css/css-loader-config');
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

const commonsChunkConfig = (config, test = /\.css$/) => {
  config.plugins = config.plugins.map(plugin => {
    if (
      plugin.constructor.name === 'CommonsChunkPlugin' &&
      // disable filenameTemplate checks here because they never match
      // (plugin.filenameTemplate === 'commons.js' ||
      //     plugin.filenameTemplate === 'main.js')
      // do check for minChunks though, because this has to (should?) exist
      plugin.minChunks != null
    ) {
      const defaultMinChunks = plugin.minChunks;
      plugin.minChunks = (module, count) => {
        if (module.resource && module.resource.match(test)) {
          return true;
        }
        return defaultMinChunks(module, count);
      };
    }
    return plugin;
  });
  return config;
};

module.exports = {
  webpack: (config, options) => {
    const { dev, isServer } = options;

    extractCSSPlugin = new ExtractTextPlugin({
      filename: 'static/style.css'
    });
    config.plugins.push(extractCSSPlugin);
    options.extractCSSPlugin = extractCSSPlugin;
    if (!isServer) {
      config = commonsChunkConfig(config);
    }

    options.defaultLoaders.css = cssLoaderConfig(
      config,
      options.extractCSSPlugin,
      {}
    );

    config.module.rules.push(
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: options.defaultLoaders.css
      },
      {
        test: /\.module\.css$/,
        use: cssLoaderConfig(config, extractCSSPlugin, {
          cssModules: true,
          dev,
          isServer
        })
      }
    );

    config = commonsChunkConfig(config, /\.(module\.css|css)$/);

    return config;
  }
};
