var webpack            = require('webpack');
var path               = require('path');
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

module.exports = {
  plugins,
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader:
        isEnvProduction ? 'babel-loader' : 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};
