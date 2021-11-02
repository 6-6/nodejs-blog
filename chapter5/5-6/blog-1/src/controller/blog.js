const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `//这里的1=1是为了占位，防止后面的语句不执行报错

  if(author){
    sql += `and author='${author}' `
  }

  if(keyword){
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  // 返回的 promise
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where 1=1 `//这里的1=1是为了占位，防止后面的语句不执行报错

  if(id){
    sql += `and id='${id}' `
  }

  sql += `order by createtime desc;`

  // 返回的 promise
  return exec(sql)
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content属性
  return{
    id: 3//表示新建博客，插入到数据表里的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客对象，包含title content属性
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}