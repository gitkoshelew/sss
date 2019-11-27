const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
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
    ]
  }
};

module.exports = merge(baseConfig, config);
