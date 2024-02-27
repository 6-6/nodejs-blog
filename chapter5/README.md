# 第5章 开发博客项目之数据存储

## 5-1 MySql介绍

### mysql环境安装
1. **下载mysql**
[官网社区版下载](https://dev.mysql.com/downloads/mysql/)

1. **mysql安装**
[MySQL-mysql 8.0.11安装教程](https://www.cnblogs.com/laumians-notes/p/9069498.html)

1. **下载mysql workbench**
这是一个可视化操作mysql的客户端
[官网workbench下载](https://dev.mysql.com/downloads/workbench/)

### 问题列表
**问题：** 报错Mysql workbench requires the visual C++ 2019 redistributable package
**解决：** 缺少C++支持，下载安装[Microsoft Visual C++](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads)即可

**问题：** Navicat 连接 mysql8 报错：2059 - Authentication plugin ‘caching_sha2_password‘ cannot be loaded:xx
**解决：** 
1. 首先进入 mysql 
	```mysql -u root -p```
2. 选择数据库
	```use mysql;```
3. 更改密码加密方式，如果是远程连接，这里的 localhost 修改成为 %
	```ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; ```
4. 更新用户密码
	```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; ```
5. 刷新权限
	```FLUSH PRIVILEGES;```

6. 删除之前旧的链接，再次新建的时候密码改为了password

## 5-2 数据库操作（创建和增、删、查）
启动数据库服务，然开始打开workbenck，登陆数据库（请查阅mysql基本命令）

| Column Name | Datatype | PK | NN | AI | Default |
| -- | -- | -- | -- | -- | -- |
| 列名 | 数据类型 | primary key 主键（唯一性的）| not null 非空（数据不能为空）| auto increment 自增（必须选中PK，会自动生成自增的数字）| 默认值 |

4. 操作数据库（增、查）
```mysql
show databases;-- 展示出所有的数据库列表

use myblog;-- 选择某个数据库

show tables;-- 展示出数据库中所有的表

insert into users(username,`password`,realname) values('lisi','123','李四');-- 往表中插入数据

select * from users;-- 查询表中所有数据，*代表所有

select id,username from users;-- 查询表中指定名称的数据

select * from users where username='zhangsan' and `password`='123';-- 条件查询语句，查询出符合条件的数据

select * from users where username like '%zhang%';-- 模糊查询语句like

select * from users where password like '%1%' order by id desc;-- 模糊查询语句并倒序列名为id的数据
```

## 5-3 数据库操作（更新）
```mysql
update users set realname='李四2' where username='lisi';-- 更新条件为username='lisi'的realname为'李四2'

delete from users where username='lisi';-- 删除users表中username为'lisi'的数据

insert into users(username,`password`,realname) values('lisi','123','李四');-- 再次新增回来

select * from users;-- 查询users表中，发现id为3，这是id自增的效果

update users set state='0' where username='lisi';-- 软删除（即改变状态，而非真的删除）

select * from users where state='1';-- 通过state控制查询的数据，'lisi'就查不到了，达到软删除的效果

select * from blogs where author='lisi' order by createtime desc;-- 查询blogs表中authod='lisi'，并根据createtime倒序排序

select * from blogs where title like '%A%' order by createtime desc;-- 模糊查询blogs表中带有'A'字符的数据，并根据createtime倒序排序

select version();-- 查询mysql版本
```

> 在查询mysql相关问题的时候，要注意时效性，每个版本并不一致。

### 问题列表
**问题：**
使用更新数据表命令update时报错，信息如下：
update users set realname='李四2' where username='lisi'	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.031 sec
**分析：**
根据报错的提示，现在使用的是安全模式，所以需要禁用它才能够使用update和delete语句
**解决：**
执行语句```SET SQL_SAFE_UPDATES = 0;```将安全模式关闭，就可以正常使用update，需要恢复改成安全模式改为```SET SQL_SAFE_UPDATES = 1;```即可。

## 5-4 nodejs操作mysql
可以使用taobao镜像安装，又可以无需使用cnpm命令。至于为什么避免使用cnpm？可以看这篇文字：[为什么不推荐使用cnpm？](https://www.jianshu.com/p/df1696de1d77)

### 开始项目
1. 新建文件夹mysql-test
2. 快速初始化npm项目```npm init -y```，新建文件index.js
3. 安装mysql模块到项目本地环境```npm i mysql --registry=https://registry.npmmirror.com```
4. [连接数据库并操作](./5-4/mysql-test/index.js)

## 5-5 nodejs链接mysql做成工具
首先要安装mysql的npm包```npm install mysql --save```，
每次我们都需要通过mysql语句来操作数据库，于是就需要形成一个方法。通过promise构造函数，创建一个实例，在实例中传递mysql语句操作数据库，利用异步的特性等待结果的返回。[查看示例](./5-5/blog-1/src/db/mysql.js)

## 5-6 API对接mysql（博客列表）
router > blog.js 获取路由地址和请求参数，并调用controller > blog.js，处理数据的getList(author, keyword) 方法，该方法会通过sql语句查询数据库的数据并返回（注意这里的返回都是promise方法）。

通过层层嵌套，我们可以学习其原理，在实际工作可能会使用封装好的方法，这部分逻辑就无需关心了。

分别指定一个无参数和参数author的get请求，然后观察其结果是否如预期
```
http://localhost:8000/api/blog/list
http://localhost:8000/api/blog/list?author=zhangsan&keyword=标题A
```

通过以上例子可以尝试自己手写，我提前将获取博客详情的代码也写好，可以看看下一章是否有新的知识点。

## 5-7 API对接mysql（博客详情和新建）