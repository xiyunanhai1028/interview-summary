/*
 * @Author: dfh
 * @Date: 2021-04-02 09:09:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-02 09:16:10
 * @Modified By: dfh
 * @FilePath: /54.axios/src/axios/cancel.js
 */
export class Cancel {
    constructor(reason) {
        this.reason = reason;
    }
}

export class CancelToken {
    constructor() {
        this.resolve = null;
    }
    source() {
        return {
            token: new Promise((resolve, reject) => {
                this.resolve = resolve;
            }),
            cancel: reason => {
                this.resolve(new Cancel(reason));
            }
        }
    }
}

export function isCancel(error) {
    return error instanceof Cancel;
}