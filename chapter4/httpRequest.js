const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res)=>{
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  //设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')

  //返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }
  
  /*
    问：为何返回的结果必须是字符串呢？如果直接输出resData是否可以？
    答：会报错TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer. Received an instance of Object
    必须为string类型或者buffer实例，至于为什么现在还不清楚
  */
  if(method === 'GET'){
    res.end(JSON.stringify(resData))
  }

  if(method === 'POST'){
    let postData = ''
    req.on('data', chunk=>{
      postData += chunk.toString()
    })

    req.on('end', ()=>{
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})

//打开地址http://localhost:8000/test/?id=123 试下
server.listen(8000, ()=>{
  console.log('监听端口8000已启动');
})