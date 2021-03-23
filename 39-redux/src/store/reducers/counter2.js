/*
 * @Author: dfh
 * @Date: 2021-03-22 16:37:54
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:37:55
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/reducers/counter2.js
 */
import * as types from '../action-types';

const initialState = { num: 1 };
function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD2:
            return { num: state.num + 1 };
        case types.MINUS2:
            return { num: state.num - 1 };
        default:
            return state;
    }
}
export default reducer;
