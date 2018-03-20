'usr strict'
var merge = require('webpack-merge')
var common = require('./webpack.config.common')
var webpack = require('webpack')
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {
  entry: ['react-hot-loader/patch', 'client.jsx'],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }
    }, {
      test: /\.(css|scss|less)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',//style-loader 将css插入到页面的style标签
        use: [{
          loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          }
        }]
      }),
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      exclude: /node_modules/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'img/[sha512:hash:base64:7].[ext]'
        }
      }
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: './assets/z.png',
      title: 'go-store-client',
    }),
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(), // HMR全局启用
    new webpack.NamedModulesPlugin(), // 在HMR更新的浏览器控制台中打印更易读的模块名称
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'manifest'],
      minChunks: 2,
    }),
    new ExtractTextPlugin({ filename: 'style.[hash].css', }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    publicPath: '/',
    clientLogLevel: 'none',
    port: 3000,
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    host: '0.0.0.0',
    disableHostCheck: true,
  }
})