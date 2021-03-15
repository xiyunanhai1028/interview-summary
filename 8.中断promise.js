/*
 * @Author: dfh
 * @Date: 2021-02-24 10:32:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 10:38:32
 * @Modified By: dfh
 * @FilePath: /test/test7/8.中断promise.js
 */
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok--')
    }, 2000);
})

function wrapperPromise(p1) {
    let about;
    const p2 = new Promise((resolve, reject) => {
        about = reject;
    })
    const p3 = Promise.race([p1, p2]);
    p3.about = about;
    return p3;
}

const promise = wrapperPromise(p);
setTimeout(() => {
    promise.about('中断promise')
}, 3000);

promise.then(data => {
    console.log(data)
}, error => {
    console.log(error);
})

