/*
 * @Author: dfh
 * @Date: 2021-03-22 16:38:31
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 16:38:31
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/actions/counter2.js
 */
import * as types from '../action-types';

const actions = {
    add2() {
        return { type: types.ADD2 };
    },
    minus2() {
        return { type: types.MINUS2 };
    }
}
export default actions;
