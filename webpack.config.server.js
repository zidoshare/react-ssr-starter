const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackNodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'server.build.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.jsx','.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: 'node',
  externals: [webpackNodeExternals()],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
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
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['./build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
}