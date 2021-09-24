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

## 4-6 初始化路由  
### 接口设计

| 描述 | 接口 | 方法 | url参数 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 获取博客列表 | /api/blog/list | get | author,keyword | 参数为空的话，则不进行查询过滤 |
| 获取一篇博客的内容 | /api/blog/detail | get | id |  |
| 新增一篇博客 | /api/blog/new | post | | post中有新增的信息 |
| 更新一篇博客 | /api/blog/update | post | id | postData中有更新的内容 |
| 删除一篇博客 | /api/blog/del | post | id |  |
| 登录 | /api/user/login | post |  | postData中有用户名和密码 |

### 模块设计
代码架构一直推崇“高内聚低耦合”，模块化的思想提升了开发效率，方便复用和维护。所以模块的设计也是必要的。

以下就是项目基础结构设计：

```
├─index.js(主入口模块，处理服务返回的值)
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