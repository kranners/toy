import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
  // https://webpack.js.org/configuration/mode
  mode: "development",
  // https://webpack.js.org/guides/typescript/
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".html", ".json"],
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};

export default config;

