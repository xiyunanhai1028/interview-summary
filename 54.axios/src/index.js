/*
 * @Author: dfh
 * @Date: 2021-04-02 07:59:01
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-02 09:18:40
 * @Modified By: dfh
 * @FilePath: /54.axios/src/index.js
 */
import axios from './axios';
const baseUrl = 'http://localhost:8080';
const user = {
    name: 'zs',
    age: 18
}

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const isCancel = axios.isCancel;

axios({
    url: baseUrl + '/post',
    method: 'post',
    data: user,
    headers: {
        'Content-Type': 'application/json',
        'name': 'lisi'
    },
    cancelToken: source.token
}).then(response => {
    console.log(response)
}).catch(error => {
    if (isCancel(error)) {
        console.log('用户自己取消')
    } else {
        console.log(error)
    }
})
source.cancel('取消了');