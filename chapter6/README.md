# 第6章 博客项目之登录

## 6-1 start
本章节主要是说明以下功能：
* 用户登录
* cookie 和 session
* session 写入 redis
* 开发登录功能，和前端联调（nginx反向代理）

## 6-2 cookie介绍
### 什么是cookie?
* 存储在浏览器中字符串，格式如 `k1=v1;k2=v2;` 的键值对（最大5kb）
* 跨域不共享
* 每次发送http请求，会将请求域的cookie一起发送给server
* server可以修改cookie并返回给浏览器
* 浏览器可以有限制的修改cookie

### 浏览器查看cookie
* 任意输入一个带有登录功能网址，Network > Headers > Request Headers > Cookie , 可以看到发送请求的cookie。
* `document.cookie` 在 console 中输入，可以查看当前页面的所有cookie。还可以通过赋值操作添加cookie，`document.cookie = 'k1=v100'`

## 6-3 cookie用于登录验证
### server端nodejs操作cookie
在 `index.js` 中解析 cookie 为键值对并存储到 req.cookie 对象中

```js
  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if(!item){
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  console.log('cookie is ', req.cookie);
```

已知 cookie 是空的，在浏览器控制台输入 `document.cookie='name=zhangsan'` 设置一个 cookie，再次访问 `http://localhost:8000` 就可以看到了。


还需要一个接口，作为登录态的检测

```js
    // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.cookie.username
        })
      )
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
```

接着就是 `/api/user/login` 登录接口，登录成功后，应该要设置一下 cookie。

```js
  //设置cookie
  res.setHeader('Set-Cookie', `username=${data.username};path=/;`)
```

因为 `/api/user/login-test` 这个接口是基于获取浏览器上的 cookie 来判断是否登录，而 `api/user/login` 接口是 POST 请求，为了方便在浏览器上测试，可以暂时改为 GET 请求。

> 注意：原视频的 req.query 在 nodejs v10 版本改为 URLSearchParams 对象，需要通过 `req.query.get()` 来获取值。


**登录流程是：**
* 用户输入用户名和密码 
* 发送登录请求（`localhost:8000/api/user/login?username=zhangsan&password=123`）
* 服务器验证用户名和密码（通过sql语句查询数据库）
* 服务器设置 cookie 到浏览器中（`req.setCookie()`）
* 返回登录成功
* 校验登录态（`localhost:8000/api/user/login-test`）
