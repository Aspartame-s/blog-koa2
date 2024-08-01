const env = process.env.NODE_ENV; //获取环境变量

let MYSQL_CONFIG
let REDIS_CONFIG

if(env == 'dev') {
    //mysql 配置
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'Blog'
    }
    
    //redis 配置
    REDIS_CONFIG = {
        port: '6379',
        host: '127.0.0.1',
        user: 'redis',
        password: 'password'
    }
}

if(env == 'production') {
    //mysql 配置
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'Blog'
    }

    //redis 配置
    REDIS_CONFIG = {
        port: '6379',
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}