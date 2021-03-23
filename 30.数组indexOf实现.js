/*
 * @Author: dfh
 * @Date: 2021-03-16 17:03:59
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-16 17:56:50
 * @Modified By: dfh
 * @FilePath: /test7/30.数组indexOf实现.js
 */
Array.prototype.indexOf = function (searchEle, fromIndex) {
    const len = this.length;
    if (fromIndex == null) fromIndex = 0;
    if (fromIndex < 0) {
        const i = len + fromIndex;
        if (this[i] === searchEle) {
            return i
        }
        return -1;
    } else {
        for (let i = fromIndex; i < len; i++) {
            if (searchEle === this[i]) {
                return i;
            }
        }
        return -1;
    }
}

//测试用力
console.log([1, 2, 3, 4].indexOf(4))
console.log([1, 2, 3, 4].indexOf(4,3))
console.log([1, 2, 3, 4].indexOf(4,-1))
