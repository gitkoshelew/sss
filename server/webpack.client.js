const path = require('path');
const fs = require('fs');
const url = require('url');
const webpack            = require('webpack');
const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require('postcss-normalize');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

const paths = require('./config/paths');


const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;

const baseConfig = require('./webpack.base.js');
const shouldUseSourceMap = isEnvDevelopment && process.env.GENERATE_SOURCEMAP !== 'false';

function addHash(template, hash) {
  if (process.env.PREBUILD === 'true'){
    return template
  }
  return isEnvProduction ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

if (!isEnvDevelopment){
  plugins.push(
    new CleanWebpackPlugin()
  );
  plugins.push(
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, './build/public/assets/')
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
  }));
  plugins.push(new Uglify());
}

const config = {
  plugins,
  // context: path.resolve(__dirname, './src'),
  entry: [
    isEnvDevelopment &&
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/client/client.js'
  ].filter(Boolean),
  output: {
    path: `${__dirname}/build/public/assets/`,
    filename: addHash('[name].bundle.js', 'hash:7'),
    publicPath: isEnvProduction ? '.' : 'http://localhost:8040/assets'
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: true,
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'build/public/media/[name].[hash:8].[ext]',
              mimetype: 'image/[ext]'
            },
          },
          { 
            test: /\.(woff|woff2|ttf|eot)/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 1
            } 
          },
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
          {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: isEnvDevelopment ? 3000 : 1000,
              name: '/media/[name].[ext]',
            }
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: '/media/[name].[ext]',
            },
          },
        ]
      },
    ]
  },
  devtool: isEnvDevelopment ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchOptions: {
      ignored: /node_modules/
    },
    contentBase: __dirname+'/build/',
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    hot: true,
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrcFolder),
    }
  }
};

// const mergedmodule = merge(baseConfig, config);
// console.log(mergedmodule)

module.exports = merge(baseConfig, config);
