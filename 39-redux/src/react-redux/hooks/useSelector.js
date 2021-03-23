/*
 * @Author: dfh
 * @Date: 2021-03-22 17:12:56
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 17:19:34
 * @Modified By: dfh
 * @FilePath: /39-redux/src/react-redux/hooks/useSelector.js
 */
import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
function useSelectorWidthStore(selector, store) {
    const selectorState = selector(store.getState());
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    React.useLayoutEffect(() => {
        return store.subscribe(forceUpdate);//订阅和删除订阅
    }, [store]);
    return selectorState;
}
function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext);
    const selectorState = useSelectorWidthStore(selector, store);
    return selectorState;
}
export default useSelector;