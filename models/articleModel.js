const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const config = require('../config/default.js')

// 通过id查找文章
async function findArticleById(id) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        let a = await article.find({_id: new ObjectId(id)}).toArray()
		return a[0]
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 通过页码查找文章
async function findArticleByPage(page) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        let a = await article.find({}, {title: 1, moment: 1}).sort({moment:-1}).limit(10).skip(page * 10 - 10).toArray()
		return a
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
//查询文章数量
async function countArticle() {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        let a = await article.countDocuments()
		return a
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 发表文章
async function addArticle(title, markdown, moment) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        await article.insertOne({title: title, markdown: markdown, moment: moment})
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 删除文章
async function deleteArticleById(id) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        await article.deleteOne({_id:  new ObjectId(id)})
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}
// 更新文章
async function updateArticle(id, title, markdown, moment) {
	let client
	try {
		client = await MongoClient.connect(config.mongoUrl)
		let article = client.db('blog').collection('article')
        await article.updateOne(
			{_id:  new ObjectId(id)},
            {$set: {title: title, markdown: markdown, moment: moment}}
		)
	} catch (err) {
        console.log('错误：' + err.message)
    } finally {
        if (client != null) client.close()
    }
}

exports.findArticleById = findArticleById
exports.findArticleByPage = findArticleByPage
exports.countArticle = countArticle
exports.addArticle = addArticle
exports.deleteArticleById = deleteArticleById
exports.updateArticle = updateArticle