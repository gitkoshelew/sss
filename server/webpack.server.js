const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;
const assetsPath = isEnvProduction ? './assets' : 'http://localhost:8040/assets'

function addHash(template, hash) {
  if (process.env.PREBUILD === 'true'){
    return template
  }
  return isEnvProduction ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`
}

plugins = [
  new CleanWebpackPlugin()
];

if (isEnvProduction){
  plugins.push(new Uglify());
}

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  plugins,

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/server'),
    publicPath:  './'
  },

  externals: [webpackNodeExternals()],

  module: {
    rules: [
      {
        test: /\.(css|less|scss|sass|pcss)$/,
        use: 
          {
            loader: path.resolve('./src/loader'),
          } 
      },
      // {
      //   test: /\.(svg)$/,
      //   use: 
      //     {
      //       loader: path.resolve('./src/assetsloader'),
      //     } 
      // },
      {
        loader: require.resolve('file-loader'),
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: 'assets/media/[name].[ext]',
        },
      },
    ]
  }
};

module.exports = merge(baseConfig, config);
