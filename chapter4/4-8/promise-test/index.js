const fs = require('fs')
const path = require('path')

//callback方式获取一个文件的内容
// function getFileContent(fileName, callback){
//   const fullFileName = path.resolve(__dirname, 'files', fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if(err){
//       console.error(err)
//       return
//     }
    
//     callback(data.toString())
//   })
// }

// 回调函数的缺点，如果过多容易形成回调地狱，代码难以阅读，出错也难以维护
// getFileContent('a.json', aData=>{
//   console.log('a data', aData);
//   getFileContent('b.json', bData=>{
//     console.log('b data', bData);
//     getFileContent('c.json', cData=>{
//       console.log('c data', cData);
//     })
//   })
// })

// 用promise获取文件内容
function getFileContent(fileName){
  const promise = new Promise((reslove, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if(err){
        reject(err)
        return
      }
      
      reslove(JSON.parse(data.toString()))
    })
  })

  return promise
}

getFileContent('a.json').then(aData=>{
  console.log('a data', aData);
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b data', bData);
  return getFileContent(bData.next)
}).then(cData => {
  console.log('c data', cData);
})