const mysql = require('mysql')
const {MYSQL_CONFIG} = require('../config/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG)

//mysql链接
con.connect()

// 统一执行sql的函数
const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}