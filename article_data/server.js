/*
*api 接口
*/

const express = require('express')
const mysql = require('mysql')
const cheerio = require('cheerio')
const request = require('request')
const buffer = require('buffer')
const urlLib = require('url')

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'gamebox'
})

const app = express()

app.get('/', (req, res)=>{
	res.send('api 接口')
})



/*
*文章列表接口，接收前台请求的页数，每页显示的条数
*/
app.get('/api/article', (req, res)=>{
	
	//解析url 参数
	let params = urlLib.parse(req.url, true).query
	if(params.banner == 1){
		db.query(`SELECT * FROM article WHERE banner=1`, (err, data)=>{
			if(err){
				res.status(500).send('database error').end()
			}else{
				res.send(data).end()
			}
		})
	}else if(params.page > 0){
		const count = 10	//每页返回count条数据
		let star = (params.page-1)*count

		db.query(`SELECT ID, pic, title, description, content FROM article limit ${star},10`, (err, data)=>{
			if(err){
				res.status(500).send('database error').end()
			}else{
				res.send(data).end()
			}
		})
	}else if(params.aid){

		/* 
		*接收文章ID, 获取某一篇文章
		*/

		db.query(`SELECT ID, pic, title, description, content FROM article WHERE ID=${params.aid}`, (err, data)=>{
			if(err){
				res.status(500).send('database error').end()
			}else{
				console.log('读取文章id为'+ params.aid)
				res.send(data).end()
			}
		})
	}
	else{
		res.send([]).end()
	}
	
})


/* 
视频接口
*/
app.get('/api/video', (req, res)=>{
	 
	let params = urlLib.parse(req.url, true).query

	if(params.page > 0){
		const count = 5	//每页返回count条数据
		let star = (params.page - 1) * count
		db.query(`SELECT ID, pic, title, longtitle, url FROM video limit ${star},${count}`, (err, data)=>{
			if(err){
				res.status(500).send('database error').end()
			}else{
				res.send(data).end()
			}
		})
	}else{
		res.send([]).end()
	}
})


/* banner */

// app.get('/api/banner', (req, res)=>{
// 	let params = urlLib.parse(req.url, true).query
	
// 	db.query(`SELECT * FROM article WHERE banner=1`, (err, data)=>{
// 		if(err){
// 			res.status(500).send('database error').end()
// 		}else{
// 			res.send(data).end()
// 		}
// 	})
	
// })

let server = app.listen(8088, ()=>{
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})