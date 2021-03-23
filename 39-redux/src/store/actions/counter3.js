/*
 * @Author: dfh
 * @Date: 2021-03-23 06:47:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 07:07:57
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/actions/counter3.js
 */
import * as types from '../action-types';

const actions = {
    asyncAdd() {
        return dispatch => {
            setTimeout(() => {
                dispatch({ type: types.ADD3 })
            }, 3000)
        }
    },
    pMinus() {
        return dispatch => {
            new Promise((resolve) => {
                resolve(1)
            }).then(res => {
                dispatch({ type: types.MINUS3 })
            })
        }
    }
}

export default actions;
