const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: "extension.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }]
  }
};
