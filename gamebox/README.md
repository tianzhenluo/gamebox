# gamebox

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目说明

``` base

项目所用到的数据接口，全部代理到article_data/server.js 的服务器（localhost:8088）

服务器搭建用node.js，express框架，你需要有本地的mysql服务器（为什么要用mysql，我喜欢，你别管）

项目的数据库已导出 （gamebox.sql）

接口映射'/api'，在gamebox/config/index.js 中有说明映射表

在你初始化项目时，需要保证node服务器已经启动，否则前端的数据都获取不到

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
