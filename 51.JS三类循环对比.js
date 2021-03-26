/*
 * @Author: dfh
 * @Date: 2021-03-26 16:29:43
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-26 17:05:43
 * @Modified By: dfh
 * @FilePath: /test7/51.JS三类循环对比.js
 */

/**
 * for循环
 *  - for循环可以自己控制循环过程
 *  - 基于var声明的时候，for和while性能差不多
 *  - 基于let声明的时候，for性能更好「原理：没有创造全局不释放的变量」
 */


/**
 * for in循环
 *  - 迭代所有可枚举属性「公有&私有」，按照原型链一级级查找，很耗性能
 *  - 问题很多：不能迭代Symbol属性，迭代顺序会以数字属性优先，公有可枚举「一般是自定义」属性也会进行迭代
 *      - 问题一：遍历顺序数字优先
 *      - 问题二：无法遍历Symbol属性
 *      - 问题三：可以遍历到公有中可枚举的      
 */
const obj = {
    name: 'zs',
    age: 12,
    [Symbol('AA')]: 100,
    0: 200,
    1: 300
}

for (const key in obj) {
    console.log('---', key)
}

const arr = [1, 2, 3, 4, 5];
for (const key in arr) {
    console.log('--', key)
}

/**
 * for of循环
 *  - 迭代器iterator规范「具备next方法，每次执行返回一个对象，具备value/done属性」
 *  - 让对象具备可迭代性并且使用for of循环
 *  - 数组/部分类数组/set/map...实现了iterator
 *  - 对象没有实现iterator 「obj is not iterable」
 */

const arr = [1, 2, 3, 4, 5];
for (const key of arr) {
    console.log('--', key)
}

/**让类数组对象实现for of循环 */
const obj = { 0: 100, 1: 200, length: 2 };
obj[Symbol.iterator] = Array.prototype[Symbol.iterator];
for (const key of obj) {
    console.log('--', key)
}


/**实现 */
const arr = [1, 2, 3, 4, 5];
arr[Symbol.iterator] = function () {
    let idx = 0;
    return {
        next: () => {
            if (idx > this.length - 1) {
                return {
                    done: true,
                    value: undefined
                }
            }
            return {
                value: false,
                value: this[idx++]
            }
        }
    }
}

console.time('FOR OF~~');
for (const val of arr) {
    console.log(val);
}
console.timeEnd('FOR OF~~');