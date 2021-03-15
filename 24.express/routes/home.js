/*
 * @Author: dfh
 * @Date: 2021-03-15 11:30:01
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 11:31:26
 * @Modified By: dfh
 * @FilePath: /test/test7/express/routes/home.js
 */
const express=require('../express');
const router=express.Router()

router.get('/add',function(req,res){
    res.end('/home/add')
})

router.get('/remove',function(req,res){
    res.end('/home/remove')
})

module.exports=router;