/*
 * @Author: dfh
 * @Date: 2021-03-22 17:58:32
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 18:01:46
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux-logger.js
 */
const logger = middlewareApi => next => action => {
    const { getState } = middlewareApi;
    console.log('--老状态--', getState());
    next(action);
    console.log('--新状态--', getState());
}
export default logger;