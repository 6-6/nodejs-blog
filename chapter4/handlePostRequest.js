const http = require('http')
const server = http.createServer((req, res)=>{
  if(req.method === 'POST'){
    //请求的数据格式
    console.log('content-type', req.headers['content-type'])
    
    let postData = ''
    //监听客户端请求的数据
    req.on('data', chunk=>{
      postData += chunk.toString()
    })

    //监听客户端请求结束
    req.on('end', ()=>{
      console.log(postData)
      res.end('hello world')
    })
  }
})

/*
postman输入JSON格式，并请求
{
    "name": 123,
    "age": 13
}
*/
server.listen(8000, ()=>{
  console.log('监听端口8000已启动');
})