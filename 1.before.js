/*
 * @Author: dfh
 * @Date: 2021-02-23 16:30:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-23 16:32:56
 * @Modified By: dfh
 * @FilePath: /test/test7/1.before.js
 */
/**
 * 什么是高阶函数？
 * 函数的参数或者返回值是一个函数的函数
 */
Function.prototype.before=function(fn){
    return ()=>{
        fn();
        this();
    }
}

function say(){
    console.log('world');
}

const fn=say.before(_=>{
    console.log('hello')
})

fn()