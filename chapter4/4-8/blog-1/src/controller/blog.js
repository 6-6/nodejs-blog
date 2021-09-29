const getList = (author, keyword) => {
  //先返回假数据，后期再学习数据库知识
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: '张三'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 15466105224373,
      author: '李四'
    }
  ]
}

const getDetail = (id) => {
  //先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1546610491112,
    author: 'zhangsan'
  }
}

module.exports = {
  getList,
  getDetail
}