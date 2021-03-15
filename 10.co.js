/*
 * @Author: dfh
 * @Date: 2021-02-24 11:14:09
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 11:21:24
 * @Modified By: dfh
 * @FilePath: /test/test7/10.co.js
 */
function co(it) {
    return new Promise((resolve, reject) => {
        const next = (val) => {
            const { value, done } = it.next(val);
            if (done) {
                return resolve(value);
            } else {
                return Promise.resolve(value).then(next, reject);
            }
        }
        next();//递归解决异步问题
    })
}