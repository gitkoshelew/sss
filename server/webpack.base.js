var webpack            = require('webpack');
var path               = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
var cssName = isEnvProduction ? 'styles.css' : 'styles.css';
var publicPath  = './public/assets';
const shouldUseRelativeAssetPaths = publicPath === './';

function addHash(template, hash) {
  return env.NODE_ENV == 'production' ?
    // template : /* without hash for dev mode*/
    template.replace(/\.[^.]+$/, `.[${hash}]$&`) :
    `${template}?hash=[${hash}]`;
}

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin({filename: cssName}),
  new webpack.DefinePlugin({
    NODE_ENV: process.env.NODE_ENV || 'development'
  }),
];

if (isEnvProduction) {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: addHash('[name].styles.css', 'hash:8'),
    // filename:  (getPath) => {
    //   return getPath('css/[name].css').replace('css/js', 'css');
    // },
    allChunks: true
  }))
}


module.exports = {
  // Tell webpack to run babel on every file it runs through
  plugins,
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader:
        process.env.NODE_ENV !== 'production' ? 'babel-loader' : 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      },
      process.env.NODE_ENV == 'production' ?
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
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
                sourceMap: shouldUseSourceMap,
              },
            }
          ]
        })
      }:
      {
        test: /\.css$/,
        loaders:[
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true
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
              sourceMap: true
            },
          }
        ]
      },
      process.env.NODE_ENV == 'production' ?
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
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
            }
          ]
        })
      } : process.env.NODE_ENV == 'development' ?
      {
        test: /\.less$/,
        use:[
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true
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
              sourceMap: true
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              sourceMap: true
            }
          }
        ]
      } : {
        test: /\.less$/,
        use: 
          {
            loader: path.resolve('./src/loader'),
          } 
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
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
