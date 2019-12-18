const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const paths = require('./config/paths');
const { addHash } = require('./src/helpers/utils');
const baseConfig = require('./webpack.base.js');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isRebiuldMode = process.env.REBUILD_MODE === 'true';
const isStaticMode = process.env.STATIC_MODE === 'true';
process.env.BABEL_ENV = process.env.NODE_ENV;

const shouldUseSourceMap = isEnvDevelopment && process.env.GENERATE_SOURCEMAP !== 'false';

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require.resolve('postcss-flexbugs-fixes'),
          require.resolve('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
        sourceMap: shouldUseSourceMap,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: shouldUseSourceMap,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  }),
];

if (isEnvProduction) {
  plugins.push(new CleanWebpackPlugin());
  plugins.push(
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, './build/public/assets/'),
    })
  );
  plugins.push(
    new MiniCssExtractPlugin({
      filename: addHash('[name].styles.css'),
      // filename:  (getPath) => {
      //   return getPath('[name].css').replace('css/js', 'css');
      // },
      chunkFilename: '[id].css',
      ignoreOrder: false,
      allChunks: true,
    })
  );
}

if (isEnvProduction && !isRebiuldMode) {
  plugins.push(new Uglify());
}

if (isEnvDevelopment && isStaticMode) {
  plugins.push(
    new HTMLWebpackPlugin({
      title: 'Only client mode',
      template: path.resolve(__dirname, './src/assets/index.html'),
    })
  );
}

const publicPathResolver = () => {
  if (isEnvProduction) return '/assets/';
  if (isStaticMode) return '/';
  return 'http://localhost:8040/assets/';
};

const config = {
  plugins,
  // context: path.resolve(__dirname, './src'),
  entry: [
    isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/client.jsx',
  ].filter(Boolean),
  output: {
    path: `${__dirname}/build/public/assets/`,
    filename: addHash('[name].bundle.js'),
    publicPath: publicPathResolver(),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              // cache: true,
              eslintPath: require.resolve('eslint'),
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
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
            test: /\.(woff|woff2|ttf|eot)/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 1,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: shouldUseSourceMap,
              },
              'sass-loader'
            ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: shouldUseSourceMap,
              },
              'less-loader'
            ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          {
            test: /\.(png|jpe?g|gif|svg|bmp|ico)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: isEnvDevelopment ? 3000 : 1000,
              name: addHash('media/[name].[ext]'),
            },
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: addHash('media/[name].[ext]'),
            },
          },
        ],
      },
    ],
  },
  devtool: isEnvDevelopment ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'build'),
    proxy: isStaticMode
      ? {}
      : {
          '*': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
          },
        },
    hot: true,
    // hotOnly: true,
    // index: 'index.html',
    quiet: true,
    // inline: true,
    liveReload: false,
    historyApiFallback: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrcFolder),
    },
  },
};

const mergedmodule = merge(baseConfig, config);
// console.log(mergedmodule);

module.exports = mergedmodule;
