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
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createTime}');
  `
  
  return exec(sql).then(insertData => {
    console.log('insertData is',insertData);
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客对象，包含title content属性
  const title = blogData.title
  const content = blogData.content
// 拼接sql语句
  const sql = `
    update blogs set title='${title}', content='${content}', createtime='${Date.now()}' where 1=1 and id='${id}';
  `
  return exec(sql).then((updateData)=>{
    console.log('updateData is ',updateData);
    if(updateData.affectedRows > 0){
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then((delData)=>{
    if(delData.affectedRows > 0){
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}