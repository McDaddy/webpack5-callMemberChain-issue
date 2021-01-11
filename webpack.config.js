const MyPlugin = require('./plugin/my-plugin');
const path = require('path');

module.exports = {
    mode:  "development",
    devtool: false,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "./public"),
      filename: "[name].js",
    },
    plugins: [
      new MyPlugin()
    ],
  };
  