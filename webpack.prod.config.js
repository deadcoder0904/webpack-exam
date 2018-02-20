const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const baseConfig = require("./webpack.base.config");

const config = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      cache: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeTagWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.min.js"
    }),
    new UglifyJsPlugin()
  ]
});

module.exports = config;
// 128 kB = 30.8 kB gzip with Plugin + options
// 152 kB = 38.1 kB gzip without Plugin
// 125 kB = 30.1 kB gzip with Plugin - options
