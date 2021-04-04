/*
 * @Author: dfh
 * @Date: 2021-04-02 08:49:22
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-02 08:51:39
 * @Modified By: dfh
 * @FilePath: /54.axios/src/axios/AxiosInterceptorManager.js
 */
class AxiosInterceptorManager {
    constructor() {
        this.interceptors = [];
    }

    use(onFulfilled, onRejected) {
        this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return this.interceptors.length - 1;//返回当前的位置
    }

    eject(interceptorIndex) {
        if (this.interceptors[interceptorIndex]) {
            this.interceptors[interceptorIndex] = null;
        }
    }
}
export default AxiosInterceptorManager;