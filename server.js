const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3486; // 修改端口

// 解析表单post数据
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 数据库连接配置，密码改为root
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'testdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL连接成功');
});

// ========== 不安全接口：字符串拼接SQL（存在注入） ==========
app.post('/login-unsafe', (req, res) => {
  const { username, password } = req.body;
  // ❌ 直接拼接！！SQL注入漏洞点
  const sql = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
  console.log("【不安全SQL】", sql);

  db.query(sql, (err, result) => {
    if (err) return res.send(`查询错误: ${err}`);
    if (result.length > 0) {
      res.send(`✅ 不安全登录成功！用户：${result[0].username}<br><a href="/">返回</a>`);
    } else {
      res.send(`❌ 账号密码错误<br><a href="/">返回</a>`);
    }
  });
});

// ========== 安全接口：参数化查询（防SQL注入） ==========
app.post('/login-safe', (req, res) => {
  const { username, password } = req.body;
  // ✅ 使用 ? 占位符，参数单独传入，不会解析为SQL代码
  const sql = `SELECT * FROM user WHERE username=? AND password=?`;
  console.log("【安全SQL模板】", sql, "参数：", username, password);

  db.query(sql, [username, password], (err, result) => {
    if (err) return res.send(`查询错误: ${err}`);
    if (result.length > 0) {
      res.send(`✅ 安全登录成功！用户：${result[0].username}<br><a href="/">返回</a>`);
    } else {
      res.send(`❌ 账号密码错误<br><a href="/">返回</a>`);
    }
  });
});

app.listen(port, () => {
  console.log(`服务启动：http://localhost:${port}`);
});
