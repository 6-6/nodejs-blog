const { getList, getDetail, newBlog, updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res)=>{
  const method = req.method // GET POST
  const id = req.query.get('id')

  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list'){
    const author = req.query.get('author') || ''
    const keyword = req.query.get('keyword') || ''
    const listData = getList(author, keyword) 

    return new SuccessModel(listData)
  }

  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail'){
    const data = getDetail(id) 

    return new SuccessModel(data)
  }

  //新建一篇博客
  if(method === 'POST' && req.path === '/api/blog/new'){
    const data = newBlog(req.body)

    return new SuccessModel(data)
  }

  //更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update'){
    const data = updateBlog(id, req.body)

    if(data){
      return new SuccessModel(data)
    }
    else{
      return new ErrorModel('更新博客失败')
    }
  }

  //删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del'){
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter