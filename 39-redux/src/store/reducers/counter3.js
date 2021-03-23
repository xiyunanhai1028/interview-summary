/*
 * @Author: dfh
 * @Date: 2021-03-23 06:49:16
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 06:49:17
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/reducers/counter3.js
 */
import * as types from '../action-types';

const initialState = { num: 1 };
function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD3:
            return { num: state.num + 1 };
        case types.MINUS3:
            return { num: state.num - 1 };
        default:
            return state;
    }
}
export default reducer;
