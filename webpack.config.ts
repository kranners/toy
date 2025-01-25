import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

import "webpack-dev-server";

const config: webpack.Configuration = {
  // https://webpack.js.org/configuration/mode
  mode: "development",
  // https://webpack.js.org/guides/typescript/
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glb|gltf)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "assets/models/" },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".html", ".json"],
  },
  devServer: {
    hot: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
};

export default config;
