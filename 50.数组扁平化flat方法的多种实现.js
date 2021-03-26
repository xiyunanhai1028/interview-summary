/*
 * @Author: dfh
 * @Date: 2021-03-25 15:35:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-25 15:41:22
 * @Modified By: dfh
 * @FilePath: /test7/50.数组扁平化flat方法的多种实现.js
 */
let arr = [
    [1],
    [2, 3],
    [4, 5, 6, [7, 8, [9, 10, [11]]]],
    12
];

console.log(arr.toString().split(',').map(item => Number(item)))

console.log(arr.flat(Infinity));

console.log(JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => Number(item)))