const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  entry: './src/main.js',
  resolve: {
    modules: [
      "node_modules",
      utils.resolve('src')
    ],
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': utils.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [utils.resolve('src')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   hotReload: true
        // }
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
          ? 'vue-style-loader'
          : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
          ? 'vue-style-loader'
          : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "~@/assets/styles/_variables.scss";'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: '[name].[hash:8].[ext]',
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          // limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'media'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: 'public/',
        to: './',
        ignore: ['*.html']
      }
    ])
  ],
  output: {
    path: utils.resolve('dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: "js/[name].chunk.js",
    // publicPath: "./"
  }
}
