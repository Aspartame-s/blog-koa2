const {exec} = require('../db/mysql')
const xss = require('xss')
//获取博客列表
const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    return await exec(sql)
}
//获取博客详情
const getDetail = async (id) => {
    let sql = `select * from blogs where id='${id}'`
    const row = await exec(sql) //改写成async await写法
    return row[0]
    // return exec(sql).then(row => {
    //     return row[0]
    // })
}
//新建博客
const newBlog = async (blogData = {}) => {
    //blogData 是post接口的 body参数
    let {title, content, author} = blogData
    const createTime = Date.now()
    title = xss(title)
    content = xss(content)
    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}')`
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    // return exec(sql).then(insertData => {
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}
//更新博客
const updateBlog = async (id, blogData = {}) => {
    // return true
    const {title, content} = blogData
    let sql = `update blogs set title='${title}', content='${content}' where id='${id}'`
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}
//删除博客
const deleteBlog = async (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}'`
    console.log(sql)
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}