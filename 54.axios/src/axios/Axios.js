/*
 * @Author: dfh
 * @Date: 2021-04-02 08:00:53
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-02 09:18:21
 * @Modified By: dfh
 * @FilePath: /54.axios/src/axios/Axios.js
 */
import qs from 'qs';
import parseHeader from 'parse-headers';
import AxiosInterceptorManager from './AxiosInterceptorManager';

class Axios {

    constructor() {
        this.interceptors = {
            request: new AxiosInterceptorManager(),
            response: new AxiosInterceptorManager()
        }
    }

    request(config = {}) {
        //设置真正要发请求的
        const chain = [{
            onFulfilled: this.dispatchRequest,
            onRejected: undefined
        }]
        //将请求拦截器一个个插入最前面，实现先放后执行
        this.interceptors.request.interceptors.forEach(interceptor => {
            interceptor && chain.unshift(interceptor);
        })

        //将响应拦截器一个一个插入尾部，实现先放先执行
        this.interceptors.response.interceptors.forEach(interceptor => {
            interceptor && chain.push(interceptor);
        })

        let promise = Promise.resolve(config);//作为下一次then的值
        while (chain.length) {
            const { onFulfilled, onRejected } = chain.shift();//取出每次的第一条
            promise = promise.then(onFulfilled, onRejected);
        }
        return promise;
    }

    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let { url, method, params, data, headers, timeout } = config;
            if (params) {
                params = qs.stringify(params);
                url = url + (url.indexOf('?') > -1 ? '&' : '?') + params;
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = {
                            data: xhr.response,
                            headers: parseHeader(xhr.getAllResponseHeaders()),
                            status: xhr.status,
                            statusText: xhr.statusText,
                            config,
                            request: xhr
                        }
                        resolve(response)
                    } else {
                        reject(new Error(`请求失败，${xhr.status}`));
                    }
                }
            }

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                })
            }

            let body = null;
            if (typeof data === 'object' && data !== null) {
                body = JSON.stringify(data);//需要注意转换成字符串
            }

            if (timeout) {
                xhr.timeout = timeout;//设置超时时间
                xhr.ontimeout = function () {
                    reject(new Error(`请求超时了～～～`))
                }
            }

            xhr.onerror = function () {
                reject(new Error(`网络异常了～～～`))
            }

            if (config.cancelToken) {
                config.cancelToken.then(reason => {
                    xhr.abort();//取消请求
                    reject(reason);
                })
            }

            xhr.send(body);
        })
    }
}
export default Axios;