const MongoClient = require('mongodb').MongoClient
const config = require('../config/default.js')

// 通过用户名查找用户
async function findUserByName(uName) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let user = client.db('blog').collection('user')
        let a = await user.find({uName: uName}).toArray()
		return a[0]
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}

exports.findUserByName = findUserByName