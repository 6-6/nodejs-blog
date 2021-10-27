const env = process.env.NODE_ENV //环境变量

// 配置
let MYSQL_CONF

// 根据环境变量判断数据库的配置，'dev'本地测试环境
if(env === 'dev'){
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'link6603',
    port: '3306',
    database: 'myblog'
  }
}

// 'production'为真实线上环境
if(env === 'production'){
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'link6603',
    port: '3306',
    database: 'myblog'
  }
}

modules.exports = {
  MYSQL_CONF
}