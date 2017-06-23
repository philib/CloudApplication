var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

const AuthService_Endpoint = process.env.AUTHSERVICE_ENDPOINT
const TenantService_Endpoint = process.env.TENANTSERVICE_ENDPOINT
const BotFrontend_Endpoint = process.env.BOTFRONTEND_ENDPOINT

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
      new webpack.DefinePlugin({
          _TenantService_Endpoint : JSON.stringify(TenantService_Endpoint),
          _AuthService_Endpoint : JSON.stringify(AuthService_Endpoint),
          _BotFrontend_Endpoint : JSON.stringify(BotFrontend_Endpoint)
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