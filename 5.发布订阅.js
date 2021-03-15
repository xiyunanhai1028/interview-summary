/*
 * @Author: dfh
 * @Date: 2021-02-24 08:36:49
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 08:46:22
 * @Modified By: dfh
 * @FilePath: /test/test7/5.发布订阅.js
 */
/**
 * 发布订阅模式：是将订阅的方法放到数组中，在事件发布时，将数组中订阅的方法一次执行，发布和订阅之间没有之间联系，需要借助中间媒介
 */
const obj = {
    _arr: [],//中间媒介
    on(fn) {//订阅
        this._arr.push(fn);
    },
    emit() {//发布
        this._arr.forEach(fn => fn());
    }
}

const person = {};

//订阅事件
obj.on(() => {
    console.log('订阅了')
})

obj.on(() => {
    if (Object.keys(person).length >= 2) {
        console.log(person);
    }
})

setTimeout(() => {
    person.name = '张三';
    obj.emit();
}, 0);

setTimeout(() => {
    person.age = 18;
    obj.emit();
}, 0);