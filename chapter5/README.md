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

## 5-2 数据库操作（创建和增、删、查）
启动数据库服务，然开始打开workbenck，登陆数据库

1. 创建库
![](http://kodbox.taros.xyz/?explorer/share/fileOut&shareID=7cgTZGhw&path=%7BshareItemLink%3A7cgTZGhw%7D%2F)

2. 选择create table，创建表
![](http://kodbox.taros.xyz/?explorer/share/fileOut&shareID=7cgdZXsA&path=%7BshareItemLink%3A7cgdZXsA%7D%2F)

3. 填写表名，添加列名和相关数据
![](http://kodbox.taros.xyz/?explorer/share/fileOut&shareID=7cgfwQeA&path=%7BshareItemLink%3A7cgfwQeA%7D%2F)

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