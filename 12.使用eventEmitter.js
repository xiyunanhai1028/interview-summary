/*
 * @Author: dfh
 * @Date: 2021-02-25 09:56:27
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-25 10:39:16
 * @Modified By: dfh
 * @FilePath: /test/test7/12.使用eventEmitter.js
 */
// const EventEmitter=require('events');
const EventEmitter=require('./13.evetEmitter实现.js')
const util=require('util');

//创建一个类
function Baby(){};
//继承
util.inherits(Baby,EventEmitter);

//创建实例
const baby=new Baby();

baby.on('newListener',(type)=>{
    console.log('newListener',type)
})

//订阅
baby.on('大哭',(...args)=>{
    console.log(...args)
});

//订阅
baby.on('大哭',(...args)=>{
    console.log(...args)
});

function eat(...args){
    console.log(...args)
}

baby.on('大哭',eat);

//取消订阅
baby.off('大哭',eat)

function unHappy(){
    console.log('我不开心')
}
baby.once('大哭', unHappy)
baby.off('大哭',unHappy)
//发布
baby.emit('大哭','我饿了','我要吃饭');
baby.emit('大哭','我饿了','我要吃饭');
