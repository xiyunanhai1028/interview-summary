/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 08:06:18
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server1.js
 */
const express=require('./express');
const app=express();

app.get('/',(req,res,next)=>{
    console.log(1);
    next();
    console.log(2)
},(req,res,next)=>{
    console.log(3);
    next();
    console.log(4)
},(req,res,next)=>{
    console.log(5);
    next();
    console.log(6)
})

app.get('/',(req,res,next)=>{
    res.end('ok');
})
app.listen(3000)