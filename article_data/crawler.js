/*
*爬取18183王者荣耀专区的文章，保存到本地的数据库
*/

const mysql = require('mysql')
const cheerio = require('cheerio')
const request = require('request')
const buffer = require('buffer')


/* 本地数据库，地址连接池 */
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'gamebox'	//数据库名称
})


/* 文章页 */

let page = 1	//起始页

const end = 20	//我想要20页的数据

for(; page<end; page++){
	
	/*
	发起请求，获取某一页列表的文章标题，配图，简介，内容
	*/

	request({
		url: 'http://www.18183.com/yxzjol/gonglue/list_13161_'+page+'.html',
		headers: {
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
		}
	}, (err, res, body)=>{
		let art = []
		if(!err && res.statusCode == 200){
			let $ = cheerio.load(body)
			let articles = $('.list-detail').find('li')
			//循环当前页的文章列表
			for(let i=0; i<articles.length;i++){
				//做了图片懒加载，图片地址挂在data-original属性上
				let picUrl = articles.eq(i).find('.pic img').attr('data-original')
				let title = articles.eq(i).find('.tit').text()
				let desc = articles.eq(i).find('.desc').text()
				picUrl = 'http:' + picUrl
				//向某一篇文章的地址发起请求，获取该文章的内容部分
				request({
					url: articles.eq(i).find('a').attr('href'),
					headers: {
						'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
					}
				}, (err, res, body)=> {
					if(!err && res.statusCode ==200 ){
						let content = ''
						let $ = cheerio.load(body)
						content = $('.arc-body').text()

						// 保存当前文章到数据库，字段（pic, title, description, content）
						db.query(`INSERT INTO article (ID, pic, title, description, content) VALUES (0, '${picUrl}', '${title}', '${desc}', '${content}')`, (err, res) => {
							if(err){
								console.log(err)
							}else{
								console.log('录入成功')
							}
						})
					}
				})
			}
		}
	})
}


/* 视频页 */

request({
	url: 'http://m.18183.com/yxzjol/sp/',
	headers: {
		'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
	}
}, (err, res,  body)=>{
	if(!err && res.statusCode == 200){
		let $ = cheerio.load(body)
		let vLink = $('.edit').find('.selectL')
		for(let i=0; i<vLink.length; i++){
			let pic = vLink.eq(i).find('img').attr('src')
			let title = vLink.eq(i).find('p').text()
			request({
				url: vLink.eq(i).find('a').attr('href'),
				headers: {
					'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
				}
			}, (err, res, body)=>{
				if(!err && res.statusCode == 200){
					let $ = cheerio.load(body)
					let longTitle = $('h1').text()
					let videoUrl = $('iframe').attr('src')

					//console.log(pic +'~~~'+ title +'~~~'+ longTitle  +'~~~'+ videoUrl )
					// 保存当前文章到数据库，字段（pic, title, description, content）
					db.query(`INSERT INTO video (ID, pic, title, longtitle, url) VALUES (0, '${pic}', '${title}', '${longTitle}', '${videoUrl}')`, (err, res) => {
						if(err){
							console.log(err)
						}else{
							console.log('录入成功')
						}
					})
					// 这里还有一层 iframe ... 我的天
					// 解析iframe时，发现腾讯的iframe 地址，body部分的所有内容都进行了加密处理，搞不定，只有用它自己的播放器来做，保存它原有的iframe地址
					//getVideo($('iframe').attr('src'))
				}else{
					console.log('访问错误')
				}
			})
		}
	}else{
		console.log('访问错误')
	}
})

function getVideo(req){
	// console.log(req)
	request({
		url: req,
		headers: {
			'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
		}
	}, (err, res, body)=>{
		if(!err){
			let $ = cheerio.load(body)
			// console.log($('body').text())
			let videoUrl = $('.tvp_video').find('video').attr('src')

			return videoUrl
			// console.log(videoUrl)
		}else{
			console.log('访问iframe出错')
		}
	})
}