const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const config = require('../config/default.js')

// 加载
async function load() {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let a = client.db('blog').collection('AnGuiKaoShi')
		let data = []
		data[0] = await a.find({type:'userData'}).toArray()
		data[1] = await a.find({type:'单选题'}).toArray()
		data[2] = await a.find({type:'多选题'}).toArray()
		data[3] = await a.find({type:'判断题'}).toArray() 
		return data
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}

exports.load = load