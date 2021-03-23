/*
 * @Author: dfh
 * @Date: 2021-03-22 16:37:24
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 06:50:54
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/reducers/index.js
 */
import { combineReducers } from '../../redux';
import Counter1 from './counter1';
import Counter2 from './counter2';
import Counter3 from './counter3';

const rootReducers = combineReducers({
    Counter1,
    Counter2,
    Counter3,
})
export default rootReducers;
