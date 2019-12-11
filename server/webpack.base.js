const webpack = require('webpack');
const path = require('path');

const paths = require('./config/paths');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins,
  mode: process.env.NODE_ENV,
  watchOptions: {
    ignored: ['build', 'node_modules']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                      }
                    }
                  }
                ]
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              compact: isEnvProduction
            }
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]
              ],
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,

              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: false
            }
          }
        ]
      }

      // {
      //   test: /\.js?$/,
      //   loader:
      //   isEnvProduction ? 'babel-loader' : 'babel-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     presets: [
      //       'react',
      //       'stage-0',
      //       ['env', { targets: { browsers: ['last 2 versions'] } }]
      //     ]
      //   }
      // }
    ]
  }
};
