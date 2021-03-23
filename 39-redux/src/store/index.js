/*
 * @Author: dfh
 * @Date: 2021-03-22 16:36:16
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 07:07:08
 * @Modified By: dfh
 * @FilePath: /39-redux/src/store/index.js
 */
import { createStore, applyMiddleware } from '../redux';
import reducers from './reducers';
import logger from '../redux-logger'
import promise from '../redux-promise'
import thunk from '../redux-thunk'


const store = applyMiddleware(promise,thunk,logger)(createStore)(reducers);
export default store;