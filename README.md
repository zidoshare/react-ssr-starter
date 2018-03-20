# react-server-render-demo

react 服务端渲染项目

## 开发与构建

### 开发环境

> npm run start

开发环境下，使用devServer做为服务器。

### 生成环境

> npm run build

会构建两个目录，分别时build目录和dist目录。

* build/:nodejs执行目录，运行时执行 node ./build/server.build.js即可

* dist/:前端页面目录，必须存在。server.js会读取dist目录中的文件

另外可以分别执行`npm run build:client`和`npm run build:server`构建项目

## 约定

* 路由配置放在**src/Routes.jsx**中。可选择使用react-loadable进行代码分离。每个route带有一个init属性，服务端会读取此属性并执行此方法（用来初始数据）。
* 默认集成eslint。在vscode中安装eslint插件可检测。开发风格偏向`tab:2 no-semi sigle-quotes`类似的简单风格
* **.browserslistrc**:postcss的配置
* **eslint.json**: eslint配置


## 特性说明

1. 代码热加载
2. react-router路由继承
3. 代码分离
4. redux集成
5. es6/es7
6. css/less/sass
7. koa2