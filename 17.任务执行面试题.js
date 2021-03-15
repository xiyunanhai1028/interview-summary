/*
 * @Author: dfh
 * @Date: 2021-02-25 10:51:30
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-25 10:53:49
 * @Modified By: dfh
 * @FilePath: /test/test7/17.任务执行面试题.js
 */
console.log(1);
async function async () {
    console.log(2);
    await console.log(3);
    console.log(4)
}
setTimeout(() => {
	console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
	console.log(res)
})
async (); 
console.log(8);

//1 6 2 3 8 7 4 5