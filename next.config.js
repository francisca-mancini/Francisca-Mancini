const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[folder][local]", // hack to not add hash on ./style.css import
  }
});