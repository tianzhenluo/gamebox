/*英雄页，爬虫，存储格式（json文件），图片保存在本地*/

const http = require('http')
const cheerio = require('cheerio')
const fs = require('fs')
const urlLib = require('url')
const iconv = require('iconv-lite')
const request = require('request')


/* 本地生成json 对应英雄名称，英雄类型 */

request({
	url: 'http://db.18183.com/wzry/',
	headers: {
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
	}
}, function(err, res, body){
	var html = ''
	if(!err && res.statusCode == 200){
		// console.log(body)
		var $ = cheerio.load(body)

		$('.hero-result-box .mod-iconlist li').each(function(){
			/* 获取英雄头像 保存到本地hero文件夹 */
			getHeroData($(this).find('img').attr('data-original'))

			/* 保存英雄信息 */
			updateJson($,$(this))

			/*每个英雄的个人详情页*/
			getHeroDescription($(this).find('a').attr('href'))
		})
	}
})

var json = {}

function updateJson($,obj){

	let hid = obj.attr('data-id')			//英雄id
	let hcate = obj.attr('data-category')	//英雄类型
	let hprice = obj.attr('data-price')		//英雄价格
	let hname = obj.find('.mod-iconitem-tit').text()	//英雄名称
	let hurl = 'hero/'+obj.find('img').attr('data-original').split('/')[obj.find('img').attr('data-original').split('/').length-1]	//本地头像路径
	
	json[hid] = {
		'category': hcate,
		'price': hprice,
		'name': hname,
		'url': hurl
	}

	/* 保存英雄信息到本地hero.json文件 */
	fs.writeFile('hero.json', '{'+JSON.stringify(json)+'}', (err) => {
		if(!err){
			console.log('写入成功')
		}
	})
}

function getHeroData(url){
	let splits = url.split('/')
	let imgName = splits[splits.length-1]

	if(url.indexOf('http://') == -1){
		url = 'http:' + url
	}
	http.get(url, function(res){
		res.pipe(fs.createWriteStream('./hero/'+imgName))
	})
}


let heroDesJson = {}

/*英雄详情页*/

function getHeroDescription(url){
	let pushUrl = 'http://db.18183.com' + url

	request({
		url: pushUrl,
		headers: {
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
		}
	}, (err, res, body)=>{
		let html = ''
		let $ = cheerio.load(body)
		if(!err && res.statusCode == 200){
			//console.log(body)
			let urlArr = url.split('/')
			let idUrlArr = urlArr[urlArr.length - 1].split('.')
			let hid = idUrlArr[0]
			let name = $('.name-box').eq(0).find('h1').text()	//英雄名称
			let cate = $('.name-box').eq(0).find('a').text()	//英雄定位
			let price = $('.base').find('dl').eq(1).find('dd').text() //购买价格
			let story = $('.otherinfo-article').eq(1).text()	//英雄背景
			
			heroDesJson[hid] = {
				'hid': hid,
				'name': name,
				'category': cate,
				'price': price,
				'story': story
			}
		}

		

		fs.writeFile('heroDesJson.json', '{' + JSON.stringify(heroDesJson) + '}', (err)=>{
			if(!err){
				console.log('英雄个人资料写入成功')
			}
		})
	})
}