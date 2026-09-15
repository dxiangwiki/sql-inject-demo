# SQL注入演示项目
用于学习理解SQL注入原理的本地演示程序，对比**字符串拼接（存在漏洞）** 和**参数化查询（防御方案）**。

> 本项目仅为教学模拟，仅用于学习，请勿用于未授权的系统测试。

## 技术栈
Node.js + Express + MySQL，前端原生HTML+JS

## 功能
1. 🔴 不安全表单：直接拼接SQL，可进行SQL注入演示
2. 🟢 安全表单：参数化查询，可对比防御效果
3. 📖 原理讲解标签页
4. 顶部滑动开关：控制输入框placeholder的Payload提示

## 环境准备
1. 安装Node.js、MySQL
2. 执行建表SQL：
```sql
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;
CREATE TABLE IF NOT EXISTS user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
);
INSERT INTO user(username,password) VALUES ('admin','123456');
```
3. 安装依赖
```bash
npm i express mysql
```
4. 修改 `server.js` 中MySQL账号密码，适配你本地数据库
5. 启动服务
```bash
node server.js
```
访问：[http://localhost:3486](http://localhost:3486)

## 测试Payload
- `admin' -- ` 用户名框输入，绕过密码校验
- `' OR '1'='1 -- ` 永真条件注入 
