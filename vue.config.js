const { defineConfig } = require('@vue/cli-service')
<<<<<<< Updated upstream
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
=======
const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
  }

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 前端端口
  devServer:{
    host:"127.0.0.1",
    port:8080
  },
>>>>>>> Stashed changes
})

// module.exports = {
//   resolve: {
//     // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
//     fallback: {
//       crypto: require.resolve('crypto-browserify'),
//       path: require.resolve('path-browserify'),
//       url: require.resolve('url'),
//       buffer: require.resolve('buffer/'),
//       util: require.resolve('util/'),
//       stream: require.resolve('stream-browserify/'),
//       vm: require.resolve('vm-browserify')
//     },
//     // 如果确认不需要node polyfill，设置resolve.alias设置为false
//     alias: {
//       crypto: false
//     }
//   }
// }

