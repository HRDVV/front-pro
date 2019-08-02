const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const notifier = require('node-notifier')
const packageConfig = require('../package.json')
const commonConfig = require('./webpack.common')
const utils = require('./utils')


const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: 'none',
  devServer: {
    contentBase: './dist',
    hot: true,
    hotOnly: true,
    port: 8000,
    host: 'localhost'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
              `Your application is running here: http://${devConfig.devServer.host}:${port}`,
              `Your application is running here: http://${utils.getAddressIp()}:${port}`
          ],
        },
        onErrors: (status, errors) => {
          if (status == 'error') {
            const error = errors[0];
            notifier.notify({
              title: packageConfig.name,
              message: status + ': ' + error.message,
              subtitle: error.file || '',
              // icon: icon
            });
          }
        }
      }))
      resolve(merge(commonConfig, devConfig))
    }
  })
})
