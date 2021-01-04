const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { removeEmpty } = require('webpack-config-utils')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/js/[name]_[hash].js',
    chunkFilename: 'assets/js/[name]_[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: [
      '.js',
      '.json',
      '.vue',
      '.css',
      '.scss'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|webp)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[ext]/[name]_[hash].[ext]',
            esModule: false
          }
        }]
      }
    ]
  },
  plugins: removeEmpty([
    new HtmlWebpackPlugin({
      title: 'Smoothroll',
      template: path.join(__dirname, '/src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '/static'),
          to: path.join(__dirname, '/dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]_[hash].css',
      chunkFilename: 'assets/css/[name]_[chunkhash].css'
    })
  ]),
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    port: 8080
  }
}
