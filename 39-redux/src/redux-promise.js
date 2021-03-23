/*
 * @Author: dfh
 * @Date: 2021-03-23 06:44:32
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 07:02:39
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux-promise.js
 */
const promise = middlewareApi => next => action => {
    const { dispatch } = middlewareApi;
    console.log(action.then)
    if (typeof action.then === 'function') {
        return action.then(dispatch);
    }else{
        next(action);
    }
}
export default promise;