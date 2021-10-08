const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method != 'POST'){
      resolve({})
      return
    }
    //使用框架则不需担心请求格式问题，因为koa2等框架都预先处理支持所有格式
    if(req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk=>{
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      if(!postData){
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader('Content-type', 'application/json')

  //获取path
  const url = req.url
  req.path = url.split('?')[0]

  //获取查询字符串的参数，原先的querystring即将被弃用
  const paramsString = url.split('?')[1]
  req.query = new URLSearchParams(paramsString)

  //处理post data
  getPostData(req).then(postData=>{
    req.body = postData
    
    //处理blog路由
    const blogData = handleBlogRouter(req, res)
    if(blogData){
      res.end(JSON.stringify(blogData))
      return
    }

    //处理user路由
    const userData = handleUserRouter(req, res)
    if(userData){
      res.end(JSON.stringify(userData))
      return
    }

    //未命中路由，返回404
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle