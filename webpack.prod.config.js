const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor-[hash].min.js"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
});

module.exports = config;
