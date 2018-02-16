const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Jarvis = require("webpack-jarvis");

const config = {
  entry: {
    vendor: ["lodash-es"],
    app: path.resolve(__dirname, "src/app.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development" // if NODE_ENV is not passed, it defaults to "development"
    })
  ].concat(process.env.JARVIS === "true" ? [new Jarvis()] : [])
};

module.exports = config;
