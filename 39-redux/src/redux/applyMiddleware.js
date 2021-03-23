/*
 * @Author: dfh
 * @Date: 2021-03-22 18:02:08
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 18:06:16
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux/applyMiddleware.js
 */
import compose from './compose';

function applyMiddleware(...middlewares) {
    return createStore => reducers => {
        const store = createStore(reducers);
        let dispatch;
        const middlewareApi = {
            getState: store.getState,
            dispatch: action => dispatch(action)
        }
        const chain = middlewares.map(middleware => middleware(middlewareApi));
        dispatch = compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}
export default applyMiddleware;
