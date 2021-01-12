const MyPlugin = require('./plugin/my-plugin');
const path = require('path');
const myI18nPlugin = require('./plugin/i18n-plugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:  "development",
    devtool: false,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "./public"),
      filename: "[name].js",
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.(tsx?|jsx?)$/,
    //       use: [
    //         {
    //           loader: 'ts-loader',
    //           options: {
    //             transpileOnly: true,
    //             // getCustomTransformers: () => ({
    //             //   before: [ myI18nPlugin() ]
    //             // }),
    //           },
    //         },
    //       ],
    //     },
    //   ]
    // },
    plugins: [
      new MyPlugin(),
      new HtmlWebpackPlugin()
    ],
  };
  