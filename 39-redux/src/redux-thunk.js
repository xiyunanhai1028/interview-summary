/*
 * @Author: dfh
 * @Date: 2021-03-23 07:05:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 07:06:49
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux-thunk.js
 */
const thunk = middlewareApi => next => action => {
    const { dispatch } = middlewareApi;
    if (typeof action === 'function') {
        return action(dispatch);
    }
    return next(action);
}
export default thunk;