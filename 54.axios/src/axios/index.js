/*
 * @Author: dfh
 * @Date: 2021-04-02 08:00:49
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-02 09:19:11
 * @Modified By: dfh
 * @FilePath: /54.axios/src/axios/index.js
 */
import Axios from './Axios';
import { CancelToken, isCancel } from './cancel';

function createInstance() {
    const context = new Axios();
    let instance = Axios.prototype.request.bind(context);
    instance = Object.assign(instance, Axios.prototype, context);
    return instance;
}

const axios = createInstance();
axios.CancelToken =new CancelToken();
axios.isCancel = isCancel;
export default axios;