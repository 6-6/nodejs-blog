//引入nodejs自带的http模块，用于构建服务
const http = require('http')

//createServer()方法返回了一个http.Server对象
const server = http.createServer((req, res)=>{
  res.end('hello world')
})

//服务启用于端口8000，浏览器访问http://localhost:8000/
server.listen(8000, ()=>{
  console.log('监听端口8000已启动')//回调函数输出信息在shell命令行当中
})