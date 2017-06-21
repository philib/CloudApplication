var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
var copyWebPackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin');

const build = process.env.NODE_ENV
var configFile = 'dev.json'

if(build === 'prod'){
  console.log('using production config')
  configFile = 'prod.json'
}

module.exports = {
  context: path.join(__dirname, ''),
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
      new WebpackShellPlugin({
          onBuildEnd: ['cp config/'+configFile +' www/assets/config/default.json']
      })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};