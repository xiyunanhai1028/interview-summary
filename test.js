/*
 * @Author: dfh
 * @Date: 2021-03-23 11:26:36
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 17:39:51
 * @Modified By: dfh
 * @FilePath: /test7/test.js
 */
const PENDDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
    if (x===promise2) return reject(new TypeError('死循环了'));
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called = false;
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            if (called) return
            called = true;
            reject(error)
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(excutor) {
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        this.state = PENDDING
        const resolve = value => {
            if (value instanceof Promise) return value.then(resolve, reject);
            if (this.state === PENDDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onFulfilledCallback.forEach(fn => fn());
            }
        }
        const reject = reason => {
            if (this.state === PENDDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn => fn());
            }
        }
        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.state === PENDDING) {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2;
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
module.exports=Promise