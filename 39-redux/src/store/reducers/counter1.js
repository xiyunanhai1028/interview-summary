/*
 * @Author: dfh
 * @Date: 2021-03-22 16:37:38
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:37:39
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/reducers/counter1.js
 */
import * as types from '../action-types';

const initialState = { num: 1 };
function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD1:
            return { num: state.num + 1 };
        case types.MINUS1:
            return { num: state.num - 1 };
        default:
            return state;
    }
}
export default reducer;
