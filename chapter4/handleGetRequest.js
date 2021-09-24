const http = require('http')
/* querystring 模块提供了用于解析和格式化网址查询字符串。
querystring API 被视为旧版的。 虽然它仍在维护，但是新的代码应该改为使用 <URLSearchParams> API。*/
const querystring = require('querystring')

const server = http.createServer((req, res)=>{
  //浏览器直接访问相当于GET请求
  console.log(req.method);//GET
  //获取请求的URL，不包括域名（例如：/?id=123）
  const url = req.url
  //将查询字符串解析为JSON对象
  req.query = querystring.parse(url.split('?')[1])
  //将结果返回到页面当中
  res.end(JSON.stringify(req.query))
})

//打开地址http://localhost:8000/?id=123 测试一下
server.listen(8000, ()=>{
    console.log('监听端口8000已启动')
})