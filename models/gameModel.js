const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const config = require('../config/default.js')

// 通过id查找游戏手册
async function findGameById(id) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        let a = await game.find({_id: new ObjectId(id)}).toArray()
		return a[0]
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 通过页码查找游戏手册
async function findGameByPage(page) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        let a = await game.find({}, {title: 1, moment: 1}).sort({moment:-1}).limit(10).skip(page * 10 - 10).toArray()
		return a
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
//查询游戏手册数量
async function countGame() {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        let a = await game.countDocuments()
		return a
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 发表游戏手册
async function addGame(title, code, markdown, moment) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        await game.insertOne({title: title, code: code, markdown: markdown, moment: moment})
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 删除游戏手册
async function deleteGameById(id) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        await game.deleteOne({_id:  new ObjectId(id)})
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 更新游戏手册
async function updateGame(id, title, code, markdown, moment) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let game = client.db('blog').collection('game')
        await game.updateOne(
			{_id:  new ObjectId(id)},
            {$set: {title: title, code: code, markdown: markdown, moment: moment}}
		)
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}

exports.findGameById = findGameById
exports.findGameByPage = findGameByPage
exports.countGame = countGame
exports.addGame = addGame
exports.deleteGameById = deleteGameById
exports.updateGame = updateGame