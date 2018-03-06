## 项目简介

> 本项目是一个vue单页应用
>  `gamebox`  所用到的技术栈包括有vue脚手架工具`vue-cli` `vue-router` `webpack`打包工具, `node.js`  `express` 
> 采用node.js 编写后端api，提供项目数据

### node 爬虫篇
> 项目数据全部都是来源于18183王者荣耀专区pc，移动端
> 
> 本项目编写了两个小爬虫，`gamebox/article_data/index.js` 跟 `gamebox/article_data/crawler.js`



`index.js爬虫`  负责爬取项目英雄页所需的数据

目标地址：[王者荣耀英雄数据](http://db.18183.com/wzry/)

用到模块：`cheerio` `fs` `url` `request`

数据存储：将英雄logo爬取保存在本地，英雄名称，简介等等保存到一份本地 `hero.json` 文件中, `heroDesJson.json`是英雄详情页数据
		
	/* 数据我已经抓取到本地，如果想让爬虫工作可以这样运行 */
	cd gamebox/article_data
	node index.js
		
`crawler.js` 负责爬取项目首页，视频页所需的数据

目标地址：[首页数据](http://www.18183.com/yxzjol/gonglue/list_13161_1.html)    [视频页数据](http://m.18183.com/yxzjol/sp/)

用到模块：`mysql` `cheerio` `request`

数据存储：首页数据、视频页数据都是保存在本地的mysql数据库中，通过node.js 搭建的`server.js `编写接口供前端请求所用

	/* 数据我已经抓取到本地，如果想让爬虫工作可以这样运行 */
	cd gamebox/article_data
	node crawler.js

### node server 篇
> `gamebox`项目服务器，`article_data/server.js` 监听本地 `8088`端口
> 启动前端项目时，需要先启动该服务器，确保前端数据能拿到

	cd gamebox/article_data
	node server.js
`数据库文件是根目录下的gamebox.sql`,如果你还不嫌麻烦的话，注意导入到本地数据库，因为我的web服务器连接了数据库
	
### 前端篇

> 前端采用 `vue-cli`脚手架工具搭建，webpack 构建项目，前端代码在 `gamebox/gamebox`下（注意有两层）

	cd gamebox/gamebox
	cnpm install
	npm run dev	
	
