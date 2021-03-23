/*
 * @Author: dfh
 * @Date: 2021-03-22 15:25:41
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 15:49:07
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux/createStore.js
 */

/**
 * 
 * @param {*} reducer 处理器
 * @param {*} initialState 仓库的初始状态
 */
function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    /**获取状态的方法 */
    function getState() {
        return state;
    }

    /**订阅，返回一个取消订阅的方法 */
    function subscribe(listener) {
        listeners.push(listener);
        return () => {//取消订阅
            const idx = listeners.indexOf(listener);
            listeners.splice(idx, 1);
        }
    }

    /**派发事件 */
    function dispatch(action) {
        state = reducer(state, action);
        //状态改变通知所以的订阅着
        listeners.forEach(listener => listener());
        return action;
    }

    //在创建仓库时，会先派发一次action,让reducer设置默认值
    dispatch({ type: '@@REDUX/INIT' });
    return {
        getState,
        subscribe,
        dispatch
    }
}

export default createStore;