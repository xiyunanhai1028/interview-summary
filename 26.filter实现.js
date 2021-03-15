/*
 * @Author: dfh
 * @Date: 2021-03-15 16:49:37
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 16:53:41
 * @Modified By: dfh
 * @FilePath: /test/test7/26.filter实现.js
 */
function filter(arr, cb) {
    if (!Array.isArray(arr) || !arr.length || typeof cb !== 'function') {
        return [];
    }
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i, arr)&&result.push(arr[i]);
    }
    return result;
}

Array.prototype.filter = function (cb) {
    return filter(this, cb);
}

const result = [1, 2, 3, 4, 5].filter(item => item > 4);
console.log(result)