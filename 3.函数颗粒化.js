/*
 * @Author: dfh
 * @Date: 2021-02-23 16:41:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-23 16:59:28
 * @Modified By: dfh
 * @FilePath: /test/test7/3.函数颗粒化.js
 */
/**
 * 函数颗粒化：函数参数截取，并合并参数
 */
function currying(fn, args = []) {
    const len = fn.length;
    return (..._) => {
        _ = args.concat(_);
        if (_.length < len) {
            return currying(fn, _);
        }
        return fn(..._);
    }
}

function sum(a, b, c, d, e, f, g) {
    return a + b + c + d + f + e + f + g;
}

const num = currying(sum)(1, 2)(3, 4)(5)(6)(7)
console.log(num)