/*
 * @Author: dfh
 * @Date: 2021-03-14 15:55:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 11:17:25
 * @Modified By: dfh
 * @FilePath: /test/test7/express/server5.js
 */
const express = require('./express');
const app = express();

app.use(function(req,res,next){
    res.send=function(data){
        if(typeof data==='object'&&data!==null){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data));
        }
    }
    next();
})
app.get('/user/:id/:name/detail',function (req, res, next) {
    const params=req.params;
    console.log(params)
    res.send(params);
});


app.listen(3000)