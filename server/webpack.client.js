const path = require('path');
const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require('postcss-normalize');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const baseConfig = require('./webpack.base.js');
const shouldUseSourceMap = isEnvDevelopment && process.env.GENERATE_SOURCEMAP !== 'false';

function addHash(template, hash) {
  return isEnvProduction 
    ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) 
    : isEnvProduction 
      ? `${template}?hash=[${hash}]`
      : template
}

const plugins = [];

if (!isEnvDevelopment){
  plugins.push(
    new CleanWebpackPlugin()
  );
  plugins.push(
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, './public/assets/')
    })
  );
  plugins.push(new MiniCssExtractPlugin({
    filename: addHash('[name].styles.css', 'hash:8'),
    // filename:  (getPath) => {
    //   return getPath('[name].css').replace('css/js', 'css');
    // },
    chunkFilename: '[id].css',
    ignoreOrder: false,
    allChunks: true
  }))
}

const config = {
  plugins,
  entry: './src/client/client.js',
  output: {
    path: `${__dirname}/public/assets/`,
    filename: addHash('[name].bundle.js', 'hash:7'),
    publicPath: isEnvProduction ? '.' : 'http://localhost:8040/assets'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          isEnvDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: shouldUseSourceMap
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                postcssNormalize(),
              ],
              sourceMap: shouldUseSourceMap
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              sourceMap: shouldUseSourceMap
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isEnvDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
              minimize: true,
              colormin: false
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                postcssNormalize(),
              ],
              sourceMap: shouldUseSourceMap
            },
          }
        ]
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' }
    ]
  },
  devtool: isEnvDevelopment ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchOptions: {
      ignored: /node_modules/
    },
    contentBase: path.resolve(__dirname, '../../src/app/static'),
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    hot: true
  }
};

// const mergedmodule = merge(baseConfig, config);
// console.log(mergedmodule)

module.exports = merge(baseConfig, config);
