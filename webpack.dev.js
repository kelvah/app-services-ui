const {webpackPaths} = require("./utils/paths")

const path = require('path');
const webpack = require('webpack');
const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require('copy-webpack-plugin');
const {port, crc} = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || port;
const PROTOCOL = process.env.PROTOCOL || 'https';

const {publicPath, viewPath, viewPathRewritePattern} = webpackPaths(crc);

console.log(`publicPath: ${publicPath}; viewPath: ${viewPath}; viewPathRewritePattern: ${viewPathRewritePattern}`)

module.exports = merge(common('development'), {

  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBasePublicPath: publicPath,
    contentBase: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: {
      index: `${publicPath}index.html`
    },
    hot: true,
    overlay: true,
    open: true,
    disableHostCheck: true,
    publicPath,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      viewPath:
        {
          target: `${PROTOCOL}://${HOST}:${PORT}${publicPath}`,
          pathRewrite: {viewPathRewritePattern: ''},
          secure: false
        }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css')
        ],
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'config/federated-modules.dev.json',
          to: `federated-modules.json`
        },
        {
          from: 'config/config.dev.json',
          to: `config.json`
        }
      ]
    })
  ]
});