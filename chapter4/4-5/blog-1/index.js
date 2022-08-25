const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader('Content-type', 'application/json')
  /* writeHead 和 setHeader区别？ */
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  const resData = {
    name: 'Wilson',
    site: 'blog',
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle