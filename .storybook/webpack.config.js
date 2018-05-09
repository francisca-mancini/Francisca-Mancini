// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const tailwindcss = require('tailwindcss');

const paths = {
  appSrc: './',
}

// Options for PostCSS as we reference these options twice
// Adds vendor prefixing to support IE9 and above
const postCSSLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebookincubator/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    tailwindcss(paths.appSrc + '/tailwind.config.js'),
  ],
  sourceMap: true
};

module.exports = (storybookConfig, configType) => {
  storybookConfig.module.rules = [
    storybookConfig.module.rules[0],
    {
      // "oneOf" will traverse all following loaders until one will
      // match the requirements. When no loader matches it will fall
      // back to the "file" loader at the end of the loader list.
      oneOf: [
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        // By default we support CSS Modules with the extension .module.css
        // {
        //   test: /\.css$/,
        //   exclude: /\.module\.css$/,
        //   use: [
        //     require.resolve('style-loader'),
        //     {
        //       loader: require.resolve('css-loader'),
        //       options: {
        //         importLoaders: 1,
        //       },
        //     },
        //     {
        //       loader: require.resolve('postcss-loader'),
        //       options: postCSSLoaderOptions,
        //     },
        //   ],
        // },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]'
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: postCSSLoaderOptions,
            }
          ]
        },
      ],
    }
  ];

  return storybookConfig;
};
