'use strict'
const path = require('path')
module.exports =  {
  output:{
    filename:'[name].[hash].js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'/',
    chunkFilename:'[name].chunk.[hash:8].js',
  },
  context:path.resolve(__dirname,'src'),
  resolve: {
    extensions: ['.js', '.jsx','.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
}