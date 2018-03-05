const mysql = require('mysql')

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'gamebox'
})

//数据测试
let data = [0, 'images/05.jpg', '测试数据第5条', '我是测试数据5', '测试内容5']
let sql = `INSERT INTO article (ID, pic, title, description, content) VALUES (0, '${data[1]}', '${data[2]}+', '${data[3]}', '${data[4]}')`

db.query(sql, (err, res)=>{
	if(err){
		console.log(err)
		return
	}else{
		console.log('插入成功')
	}
})
