/*
 * @Author: dfh
 * @Date: 2021-02-24 10:56:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 11:14:01
 * @Modified By: dfh
 * @FilePath: /test/test7/9.generator.js
 */
function* fn() {
    const a = yield 1;
    console.log(a);//1

    const b = yield 2;
    console.log(b);//2

    const c = yield 3;
    console.log(c);//3
}

const it=fn();
const it1=it.next();
console.log('it1',it1);//{ value: 1, done: false }
const it2=it.next(it1.value)
console.log('it2',it2);//{ value: 2, done: false }
const it3=it.next(it2.value)
console.log('it3',it3);//{ value: 3, done: false }
const it4=it.next(it3.value)
console.log('it4',it4);//{ value: undefined, done: true }