/*
 * @Author: dfh
 * @Date: 2021-02-24 11:39:24
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 11:42:49
 * @Modified By: dfh
 * @FilePath: /test/test7/11.promise测试题.js
 */
Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
        console.log("then1-1");
       return Promise.resolve();
    }).then(() => {
        console.log("then1-2");
    });
})
.then(() => {
    console.log("then2");
})
.then(() => {
    console.log("then3");
})
.then(() => {
    console.log("then4");
})
.then(() => {
    console.log("then5");
})