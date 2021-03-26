/*
 * @Author: dfh
 * @Date: 2021-03-25 13:43:28
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-26 17:48:02
 * @Modified By: dfh
 * @FilePath: /test7/46.call&apply.js
 */
/**
 * call和apply的区别是什么，哪个性能更好一些？
 * - call:第一个参数是函数内部this的指向，后续的参数则是函数执行时所需要的参数，一个一个传递
 * - apply:第一个参数与call相同，为函数内部this指向，而函数的参数，则以数组形式传递
 * - call的性能更好
 */

/**call的实现 */
Function.prototype.call = function (context, ...args) {
    let self = this,
        key = Symbol('KEY'),
        result;
    context == null ? context = window : null;
    !/^(object|function)$/i.test(typeof context) ? context = Object(context) : null;
    context[key] = self;
    result = context[key](...args);
    delete context[key];
    return result;
}

/**apply的实现 */
Function.prototype.apply = function (context, args) {
    let self = this,
        key = Symbol('KEY'),
        result;
    context == null ? context = window : null;
    !/^(object|function)$/i.test(typeof context) ? context = Object(context) : null;
    context[key] = self;
    result = context[key](...args);
    delete context[key];
    return result;
}

function sum(a,b){
    return a+b;
}

console.log(sum.apply(sum,[1,2]));