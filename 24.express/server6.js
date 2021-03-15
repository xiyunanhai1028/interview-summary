/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 12:33:42
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server6.js
 */
const express = require('./express');
const user = require('./routes/user');
const home = require('./routes/home');
const app = express();

app.use('/home', home);
app.use('/user', user);

app.listen(3000)