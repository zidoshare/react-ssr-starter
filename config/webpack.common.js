const path = require('path')
const rootPath = path.join(__dirname, '../')
module.exports = {
  context: path.join(rootPath, './src'),
  entry: {
    client: './index.js',
    vendors: ['react',
      'react-dom',
      'react-loadable',
      'react-redux', 'redux',
      'react-router-dom',
      'react-router-redux',
      'redux-thunk'
    ],
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(rootPath, './dist'),
    publicPath: '/',
    chunkFilename: '[name]-[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(rootPath, 'src'), 'node_modules']
  },
}