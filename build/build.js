const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const prodConfig = require('./webpack.prod')

process.env.NODE_ENV = 'production'

const spinner = ora('building for production...')

spinner.start()

rm(path.join(__dirname, '../dist'), err => {
    if (err) throw err
    webpack(prodConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
        // console.log(stats)
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))

    })
})
