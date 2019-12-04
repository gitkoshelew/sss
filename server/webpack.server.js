const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const addHash = require('./src/helpers/utils').addHash;

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isRebiuldMode = process.env.REBUILD_MODE === 'true';
process.env.BABEL_ENV = process.env.NODE_ENV;

plugins = [
  new CleanWebpackPlugin()
];

if (isEnvProduction && !isRebiuldMode){
  plugins.push(new Uglify());
}
// if (isRebiuldMode){
//   plugins.push(
//     new CopyWebpackPlugin(
//       [
//         // { from: '../manifest.json', to: `manifest.json` },
//         // { from: '../browserconfig.xml', to: `browserconfig.xml` },
//         // { from: 'assets/images/bg', to: `images` },
//         // { from: 'assets/images/img', to: `images` },
//         { from: './build/server', to: `../public` },
//       ]
//     ),
//   )
// }

const config = {
  target: 'node',
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build/server`,
    publicPath: isEnvProduction ? '.' : 'http://localhost:8040',
  },

  externals: [webpackNodeExternals()],

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(css|less|scss|sass|pcss)$/,
            use: 
              {
                loader: path.resolve('./src/helpers/fake-loader'),
              } 
          },
          {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: isEnvDevelopment ? 3000 : 1000,
              name: addHash('/assets/media/[name].[ext]'),
            }
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: addHash('/assets/media/[name].[ext]'),
            },
          },
        ]
      }
    ]
  },
  plugins
};

module.exports = merge(baseConfig, config);
