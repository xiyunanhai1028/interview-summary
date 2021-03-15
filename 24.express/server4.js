/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 09:11:16
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server4.js
 */
const express = require('./express');
const app = express();

app.use(function (req, res, next) {
    console.log('所有请求都要经过我');
    next();
});

app.use('/user', function (req, res, next) {
    console.log('user开头的请求经过我');
    next()
});

app.use('/cart', function (req, res, next) {
    console.log('cart开头的请求经过我');
    next()
});

app.use('/user/add', function (req, res, next) {
    next('user/add 错误了，哈哈哈')
});

app.use('/user/cart', function (req, res, next) {
    next('user/cart 错误了，嘻嘻嘻')
});

app.use((err, req, res, next) => {
    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end(err);
})

app.listen(3000)