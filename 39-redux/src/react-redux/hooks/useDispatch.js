/*
 * @Author: dfh
 * @Date: 2021-03-22 17:12:51
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 17:14:46
 * @Modified By: dfh
 * @FilePath: /39-redux/src/react-redux/hooks/useDispatch.js
 */
import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
const useDispatch = () => {
    return React.useContext(ReactReduxContext).store.dispatch;
}
export default useDispatch;