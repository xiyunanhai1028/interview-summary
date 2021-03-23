/*
 * @Author: dfh
 * @Date: 2021-03-22 15:19:30
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 06:46:53
 * @Modified By: dfh
 * @FilePath: /39-redux/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
import Counter3 from './components/Counter3'
import { Provider } from './react-redux'
import store from './store'

ReactDOM.render(<Provider store={store}>
    <Counter1 />
    <Counter2 />
    <Counter3 />
</Provider>, document.getElementById('root'));
