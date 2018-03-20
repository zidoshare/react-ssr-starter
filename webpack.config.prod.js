const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.config.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
  entry: {
    client: 'client.jsx',
  },
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
    }],
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{ from: 'assets/z.png', to: 'favicon.ico' }]),
    new CleanWebpackPlugin(['./dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'go-store-client',
      filename: 'index.html',
      template: './index.prod.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'manifest'],
      minChunks: 2
    }),
    new ReactLoadablePlugin({
      filename: path.join('./dist/react-loadable.json'),
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  }
})