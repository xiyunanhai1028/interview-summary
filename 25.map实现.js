/*
 * @Author: dfh
 * @Date: 2021-03-15 16:35:21
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 16:50:02
 * @Modified By: dfh
 * @FilePath: /test/test7/25.map实现.js
 */


function map(arr, cb) {
    if (!Array.isArray(arr) || !arr.length || typeof cb !== 'function') {
        return [];
    }
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(cb(arr[i], i, arr));
    }
    return result;
}

Array.prototype.map=function(cb){
    return map(this,cb);
}
const result=[1,2,3,4].map((item,index)=>item>3);
console.log(result)