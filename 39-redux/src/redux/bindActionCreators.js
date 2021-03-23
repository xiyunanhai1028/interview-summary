/*
 * @Author: dfh
 * @Date: 2021-03-22 16:28:46
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:33:15
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux/bindActionCreators.js
 */

/**
 * 
 * @param {*} actionCreator 
 * @param {*} dispatch 
 */
function bindActionCreator(actionCreator, dispatch) {
    return (...args) => {
        const action = actionCreator.apply(this, args);
        dispatch(action);
    }
}
/**
 * 
 * @param {*} actionCreators 对象
 * @param {*} dispatch 派发
 */
function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {};
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key];
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
    return boundActionCreators;
}
export default bindActionCreators;