/*
 * @Author: dfh
 * @Date: 2021-02-24 08:59:28
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 10:31:23
 * @Modified By: dfh
 * @FilePath: /test/test7/7.promise.js
 */

/**
 * 1.promise的三种状态？
 * 成功态，失败态，等待态，promise一旦处于成功态或者失败态就不能在成功或者失败了
 */
const PENDDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function isPromise(x) {
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        if (typeof x.then === 'function') return true;
    }
    return false
}

function resolvePromise(promise, x, resolve, reject) {
    //promise与x相同会出现死循环
    if (x === promise) return reject(new TypeError('错误'));
    //判断x是一个对象
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        //保证执行一次
        let called = false;
        try {
            //判断x是promise
            const then = x.then;
            //x是promise
            if (typeof then === 'function') {
                then.call(x, y => {//成功回调
                    if (called) return;
                    called = true;
                    //y有可能也是异步的
                    resolvePromise(promise, y, resolve, reject);
                }, r => {//失败回调
                    if (called) return;
                    called = true;
                    reject(r);
                })
            } else {//x是一个普通对象
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else {//x是一个普通值
        resolve(x);
    }
}
class Promise {
    constructor(excutor) {//执行器
        this.value = undefined;//初始化成功值
        this.reason = undefined;//初始化失败值
        this.state = PENDDING;//初始化当前处于的状态
        //发布订阅中的媒介
        this.onFulfilledCallback = [];//存放等待中成功的回调
        this.onRejectedCallback = [];//存放等待中的失败的回调
        const resolve = value => {
            //value是一个Promise的情况
            if (value instanceof Promise) return value.then(resolve, reject);
            //只有处于等待态的才需要处理
            if (this.state === PENDDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onFulfilledCallback.forEach(fn => fn());//发布
            }
        }
        const reject = reason => {
            //只有处于等待态的才需要处理
            if (this.state === PENDDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn => fn());
            }
        }

        try {
            excutor(resolve, reject);//需要捕获excutor执行时出错的情况
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        //值的穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

        //then里面存在异步的情况，所以需要用promise包装
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {//成功态的处理
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.state === PENDDING) {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                })
            }
        })
        return promise2;
    }

    catch(error) {
        this.then(null, error);
    }

    static resolve(value) {
        //resolve后可以跟then,所以需要返回一个promise
        //resolve会有等待效果
        return new Promise((resolve) => {
            resolve(value)
        })
    }

    static reject(reason) {
        //立马执行，没有等待效果
        return new Promise((_, reject) => {
            reject(reason);
        })
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            let arr = [];
            let timers = 0;
            const collectResult = (val, key) => {
                arr[key] = val;
                if (++timers === values.length) resolve(arr);
            }
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                if (value && isPromise(value)) {
                    value.then(x => {
                        collectResult(x, i);
                    }, reject)
                } else {
                    collectResult(value, i)
                }
            }
        })
    }

    /**
     * 1.finally返回的是一个promise
     * 2.finally回调没有参数
     * 3.finally不管成功还是失败都会执行
     * 4.finally成功的值不会作为下一次then的值
     * 5.finally失败会中断链，失败的值会作为一下then的值
     */
    finally(callback){
        //不管成功还是失败callback都会执行
        this.then(data=>{
            //callback执行可能是一个promise需要等待他执行完成
            return Promise.resolve(callback()).then(_=>data);
        },error=>{
            return Promise.resolve(callback()).then(_=>{throw error})
        })
    }
}

Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise

