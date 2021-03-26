/*
 * @Author: dfh
 * @Date: 2021-03-25 14:44:04
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-25 15:04:09
 * @Modified By: dfh
 * @FilePath: /test7/48.实现访问对象里属性的值.js
 */
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, 'a');// = 1;
let r2 = parse(obj, 'b.c');// = 2;
let r3 = parse(obj, 'd[2]');// = 3;
let r4 = parse(obj, 'e[0].f[0]');// = 4;

// function parse(obj,str){
//     return new Function('obj','return obj.'+str)(obj)
// }

function parse(obj,str){
    str=str.replace(/\[(\d+)\]/g,'.$1')//e.0.f.0
    arr=str.split('.');
    arr.forEach(item=>{
        obj=obj[item]
    })
    return obj
}
console.log(r1)
console.log(r2)
console.log(r3)
console.log(r4)