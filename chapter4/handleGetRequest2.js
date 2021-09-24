const http = require('http')

const server = http.createServer((req, res)=>{
  //将查询字符串解析为JSON对象
  // const myURL = new URL(req.url)
  //const id = myURL.searchParams.get('id')
  // console.log(req);
  console.log(req.url);
  console.log(res);
  
  
  //将结果返回到页面当中
  res.end(JSON.stringify(req.url))
})

//打开地址http://localhost:8000/?id=123 测试一下
server.listen(8000, ()=>{
  console.log('监听端口8000已启动')
})