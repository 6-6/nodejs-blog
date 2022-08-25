# 第4章 开发博客项目之接口

## 4-1 http-概述  

**问题：** 从浏览器输入地址到显示页面发生了什么？

**回答：**  
1. DNS解析域名，建立TCP连接（http三次握手），发送http请求。
1. 服务端收到http请求，处理并返回对应数据。
1. 客户端收到服务端返回的数据，处理数据并渲染页面（DOM树、CSS、JS执行）

详细请移步：[URL的输入到浏览器解析的一系列事件](https://juejin.cn/post/6844903832435032072)

## 4-2 处理get请求  
[获取get请求参数](./handleGetRequest.js)

## 4-3 处理post请求  
[获取post请求参数](./handlePOSTRequest.js)

## 4-4 处理http请求  
[综合处理http请求](./httpRequest.js)

## 4-5 搭建开发环境  
1. **项目初始化：**

    命令行输入```npm init -y```，快速生成的默认的package.json文件，创建入口文件index.js

2. **安装nodemon：**

    用于监测文件变化，自动重启node， ```npm install --save-dev nodemon``` 

3. **安装cross-env：**

    这是一款运行跨平台设置和使用环境变量的脚本。

    安装：```npm install --save-dev cross-env```

    用法：通常本地项目和正式线上项目连接的数据库不一致，那么我们如何区分线上和本地呢？通过环境变量。

    例如：[package.json](./4-5/blog-1/package.json)的这项配置：

    ```javacript
        "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js", //NODE_ENV=dev代表着本地的开发环境
        "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js" //NODE_ENV=production代表线上正式生产环境
    ```
4. **运行项目：**
    在项目根目录下运行```npm run dev```即可运行项目

### 结构拆分
这里拆分了两个文件，`www.js` 和 `index.js` ，前者是作为server服务，比如`启动服务`和`监听端口`等，后者则是业务代码。模块化的思想有利于开发大型应用。
### mock测试
在这个示例中，我添加了非视频教程中的功能。主要是平时开发当中最基础的做法，需要后端提供接口。可以通过node快速搭建服务，返回一些测试数据。（实际开发中可以用postman或者其它应用）个人还是比较喜欢用这样的方式，可以通过对比测试来验证一些想法。

`index.html` 和 `main.js`的文件，这里主要是模拟请求接口。
### 问题解答：
1. writeHead 和 setHeader区别？
```javascript
request.setHeader(name, value)


//参数1：必选，http状态码
//参数2：可选，状态描述
//参数3：可选，告诉浏览器我发给你的数据是什么类型的
response.writeHead(statusCode[, statusMessage][, headers])
```
**总结：**
* writeHead 只能被调用一次，可以同时设置多个属性。

* setHeader 能设置一个属性，可以调用多次。

* writeHead 且必须在 response.end() 被调用之前调用。

* response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先。
## 4-6 初始化路由  
### 接口设计

| 描述 | 接口 | 方法 | url参数 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 获取博客列表 | /api/blog/list | get | author,keyword | 参数为空的话，则不进行查询过滤 |
| 获取一篇博客的内容 | /api/blog/detail | get | id |  |
| 新增一篇博客 | /api/blog/new | post | title,content | postData中有新增的信息 |
| 更新一篇博客 | /api/blog/update | post | id | postData中有更新的内容 |
| 删除一篇博客 | /api/blog/del | post | id |  |
| 登录 | /api/user/login | post |  | postData中有用户名和密码 |

### 模块设计
代码架构一直推崇“高内聚低耦合”，模块化的思想提升了开发效率，方便复用和维护。要设计模块就必须了解MVC和MVVM等设计模式。首先就是基础的服务层，然后扩展至判断输入参数的路由模块，而index.js类似一个入口或者是执行的模块，用于执行服务的回调以及到路由的回参等等。

以下就是项目基础结构设计：

```
├─index.js(主入口模块，配置了许多基本设置)
├─package-lock.json
├─package.json
├─src
|  ├─router(路由模块)
|  |   ├─blog.js(处理/api/blog路由的逻辑)
|  |   └user.js(处理/api/user路由的逻辑)
├─bin
|  └www.js(服务模块)
```
> 以上树形目录生成工具：[npm - treer](https://www.npmjs.com/package/treer)

## 4-7 开发路由（博客列表路由） 
可以看出来，新建了model和controller目录。这两个模块的功能是什么呢？resModel.js是重新将数据整理成返回失败和返回成功两种范式，controller下的blog.js专注的是数据，根据不同的请求方法和参数，解析查询数据库返回对应的数据（此处只是返回假数据）。


> querystring模块即将被弃用，我们可以使用URLSearchParams
https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams

测试新建博客的功能，实用工具postman，将地址栏中输入：http://localhost:8000/api/blog/list?author=James&keyword=title1

返回参数：
```JSON
{
    "data": [
        {
            "id": 1,
            "title": "标题A",
            "content": "内容A",
            "createTime": 1546610491112,
            "author": "张三"
        },
        {
            "id": 2,
            "title": "标题B",
            "content": "内容B",
            "createTime": 15466105224373,
            "author": "李四"
        }
    ],
    "error": 0
}
```

以上例子是测试JSON数据，不经过数据库。以下的路由都可以这样测试，通过示例了解程序是如何进行的。

## 4-8 开发路由（博客详情路由） 
同上一章节的方式，添加一个获取博客详情的路由

[fs文件系统读取多个本地资源](./4-8/promise-test/index.js)

## 4-9 开发路由（处理POSTDATA） 
### 新增功能：
index.js > getPostData()方法，用于处理post data，然后将post data传入处理路由的方法中

## 4-10 开发路由（新建和更新博客路由） 
**问题：** 发现postman的一个bug，当我使用http://localhost:8000/api/blog/update测试时，发现返回的结果是http://localhost:8000/api/blog/list，反复进行验证确实代码没写错。
**解决：** 全部关闭再次重启postman，然后就好了（重启大法好）。

## 4-11 开发路由（删除博客路由和登录路由） 
controller文件夹下添加user.js，用于处理登录数据。项目基础结构图：
```
├─index.js
├─package-lock.json
├─package.json
├─src
|  ├─router
|  |   ├─blog.js
|  |   └user.js
|  ├─model
|  |   └resModel.js
|  ├─controller
|  |   ├─blog.js
|  |   └user.js
├─bin
|  └www.js
```

**问题：** 为何要将router和controller分开两个文件？
**解决：** router负责处理路由，controller负责处理数据，职责分明使得项目结构清晰容易维护。
