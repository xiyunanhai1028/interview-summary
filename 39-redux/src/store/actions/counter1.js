/*
 * @Author: dfh
 * @Date: 2021-03-22 16:38:15
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:38:15
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/actions/counter1.js
 */
import * as types from '../action-types';

const actions = {
    add1() {
        return { type: types.ADD1 };
    },
    minus1() {
        return { type: types.MINUS1 };
    }
}
export default actions;
