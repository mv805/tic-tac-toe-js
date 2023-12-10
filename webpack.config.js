const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  devtool: "source-map",
  // devServer: {
  //   static: "./dist",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tic Tac Toe",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Added publicPath for GitHub Pages
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
