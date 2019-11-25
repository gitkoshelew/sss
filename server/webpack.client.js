const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
var jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';
var publicPath = 'http://localhost:8040/assets';

const config = {
  // Tell webpack the root file of our
  // server application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
};

module.exports = merge(baseConfig, config);
