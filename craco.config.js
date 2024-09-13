const path = require("path");
const fs = require("fs");
const glob = require("glob-all");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const {PurgeCSSPlugin} = require("purgecss-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      new PurgeCSSPlugin({
        paths: [
          resolveApp("public/index.html"),
          ...glob.sync(`${resolveApp("src")}/**/**/*`, { nodir: true })
        ],
        
      })
    ]
  }
};