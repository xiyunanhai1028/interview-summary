/*
 * @Author: dfh
 * @Date: 2021-02-23 16:41:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 10:54:16
 * @Modified By: dfh
 * @FilePath: /test7/3.函数颗粒化.js
 */
/**
 * 函数颗粒化：柯里化，英语：Currying(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数新函数的技术。
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