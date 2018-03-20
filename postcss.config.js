//处理css前缀，用来更好的兼容各种浏览器
//在 package.json中 使用 browserslist 字段已经定义好了浏览器适配（官方推荐）
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}