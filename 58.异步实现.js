/*
 * @Author: dfh
 * @Date: 2021-04-07 12:40:31
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-07 12:40:32
 * @Modified By: dfh
 * @FilePath: /test7/58.异步实现.js
 */
function isPromise(x) {
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        if (typeof x.then === 'function') return true;
    }
    return false;
}
function all(values) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        const collectResult = (key, val) => {
            result[key] = val;
            if (index++ === values.length) return resolve(result)
        }

        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            if (value && isPromise(value)) {
                Promise.resolve(value).then(x => {
                    collectResult(i, x)
                }, reject)
            } else {
                collectResult(i, value);
            }
        }
    })
}


function co(it){
    return new Promise((resolve,reject)=>{
        const next=(val)=>{

        }
    })
}