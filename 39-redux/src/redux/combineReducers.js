/*
 * @Author: dfh
 * @Date: 2021-03-22 16:38:52
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:50:52
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux/combineReducers.js
 */

/**
 * 
 * @param {*} reducers reducer的集合
 * @returns 返回一个reducer
 */
function combineReducers(reducers) {
    return (state={}, action) => {
        const rootState = {};//存储所以的状态
        let changed = false;
        for (const key in reducers) {
            const reducer = reducers[key];//每一个的分reducer
            const previouseStateForkey = state[key];//每一个分state
            const nextStateForkey = reducer(previouseStateForkey, action);//下一个分state
            if (previouseStateForkey !== nextStateForkey) {//新老不一样
                changed = true;
            }
            rootState[key] = nextStateForkey;
        }
        return changed ? rootState : state;
    }
}
export default combineReducers;