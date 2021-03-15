/*
 * @Author: dfh
 * @Date: 2021-03-15 16:54:56
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 17:09:38
 * @Modified By: dfh
 * @FilePath: /test/test7/27.reduce实现.js
 */

function reduce(arr, initialValue, cb) {
    if (!Array.isArray(arr) || !arr.length || typeof cb !== 'function') {
        return [];
    }
    const hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];
    for (let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
        value = cb(value, arr[i], i, arr);
    }
    return value;
}

Array.prototype.reduce = function (cb, initialValue) {
    return reduce(this, initialValue, cb)
}

const result = [1, 2, 3, 4, 5].reduce((memo, current, index) => {
    memo.push(current + 1)
    return memo;
}, []);
console.log(result)