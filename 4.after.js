/*
 * @Author: dfh
 * @Date: 2021-02-23 17:00:36
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-23 17:02:46
 * @Modified By: dfh
 * @FilePath: /test/test7/4.after.js
 */
function after(timers, cb) {
    return () => {
        if (--timers === 0) {
            cb()
        }
    }
}

const newFn=after(3,()=>{
    console.log('ok');
})
newFn();
newFn();
newFn();