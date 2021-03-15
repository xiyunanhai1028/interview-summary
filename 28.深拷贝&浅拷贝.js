/*
 * @Author: dfh
 * @Date: 2021-03-15 18:33:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 19:03:37
 * @Modified By: dfh
 * @FilePath: /test/test7/28.深拷贝&浅拷贝.js
 */
/**
 * 浅拷贝：改变拷贝前的内容，会对拷贝后的内容有影响，拷贝前和拷贝后的有关系
 * 深拷贝：拷贝后的结果更改是不会影响拷贝前的，拷贝前后没有关系
 */

//...运算符一层的时候是深拷贝,多层的时候是浅拷贝
let obj = { name: 'zhangsan' };
let o = { ...obj };
o.name = 'lisi'
console.log(obj, o);//{ name: 'zhangsan' } { name: 'lisi' }
console.log(obj === o);//false

let obj2 = { name: 'zhangsan', address: { x: 200, y: 200 } };
let o2 = { ...obj2 };
o2.name = 'lisi';
console.log(obj2, o2);//{ name: 'zhangsan', address: { x: 200, y: 200 } } { name: 'lisi', address: { x: 200, y: 200 } }
console.log(obj2 === o2);//false

//slice浅拷贝
let a = [1, 2, 3];
let arr = [a];
let newArr = arr.slice();
newArr[0][0] = 100;
console.log(arr);//[ [ 100, 2, 3 ] ]


//JSON.stringify实现深拷贝，func,undefined会丢失
let obj = { name: 'zs', address: { x: 100, y: 200 }, func: function () { }, age: undefined };
let o = JSON.parse(JSON.stringify(obj));
obj.address.x = 200;
console.log(obj, o);
/**
 {name: 'zs',address: { x: 200, y: 200 },func: [Function: func],age: undefined    }
 {name: 'zs', address: { x: 100, y: 200 } }
 */


//实现一个拷贝
function deepClone(obj, hash = new WeakMap) {
    if (obj == null) return obj;//如果是null或者udefined，不进入拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    //可能是对象/普通值，函数的话被需要深拷贝
    if (typeof obj !== 'object') return obj;//普通值
    //是对象的话，进行深拷贝
    if (hash.get(obj)) return hash.get(obj);//查看弱引用是否有，有直接拿
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);//放入弱引用
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            //实现一个递归深拷贝
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}
let obj={name:'zs',address:{x:100,y:100}};
obj.o=obj;//防止递归调用死循环，使用了WeekMap
let o=deepClone(obj);
o.address.x=200;
console.log(obj);//{ name: 'zs', address: { x: 100, y: 100 }, o: [Circular *1] }
console.log(o);//{ name: 'zs', address: { x: 200, y: 100 }, o: [Circular *1] }