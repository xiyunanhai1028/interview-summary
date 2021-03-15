/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 08:26:46
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server2.js
 */
const express = require('./express');
const app = express();

app.get('/', (req, res, next) => {
    console.log('get');
    res.end('get')
})
app.post('/', (req, res, next) => {
    console.log('post');
    res.end('post')
})
app.listen(3000)