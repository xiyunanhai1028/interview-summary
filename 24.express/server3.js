/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 08:49:41
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server3.js
 */
const express = require('./express');
const app = express();

app.use(function(req,res,next){
    console.log('所有请求都要经过我');
    next();
});

app.use('/user',function(req,res,next){
    console.log('user开头的请求经过我');
    next()
});

app.use('/cart',function(req,res,next){
    console.log('cart开头的请求经过我');
    next()
});

app.use('/user/add',function(req,res,next){
    console.log('user/add');
    res.end('/user/add')
});

app.use('/user/cart',function(req,res,next){
    console.log('user/cart');
    res.end('/user/cart')
});

app.listen(3000)