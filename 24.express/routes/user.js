/*
 * @Author: dfh
 * @Date: 2021-03-15 11:29:57
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 12:33:51
 * @Modified By: dfh
 * @FilePath: /test/test7/express/routes/user.js
 */
const express=require('../express');
const router=express.Router()

router.get('/add',function(req,res){
    res.end('/user/add')
})

router.get('/remove',function(req,res){
    res.end('/user/remove')
})

module.exports=router;