/*
 * @Author: dfh
 * @Date: 2021-03-22 16:56:31
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 17:09:20
 * @Modified By: dfh
 * @FilePath: /39-redux/src/react-redux/connect.js
 */
import React from 'react';
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux'
function connect(mapStateToProps, mapDispatchToProps) {
    return OldComponent => {
        return props => {
            const {store} = React.useContext(ReactReduxContext);
            const { getState, subscribe, dispatch } = store;

            const prevState = getState();//仓库状态
            const stateToProps = React.useMemo(() => mapStateToProps(prevState), [prevState]);
            
            const dispatchToProps = React.useMemo(() => {
                if (typeof mapDispatchToProps === 'object') {
                    return bindActionCreators(mapDispatchToProps, dispatch);
                } else if (typeof mapDispatchToProps === 'function') {
                    return mapDispatchToProps(dispatch, props);
                } else {
                    return { dispatch }
                }
            }, [dispatch]);

            const [, forceUpdate] = React.useReducer(x => x + 1, 0);
            //订阅
            React.useLayoutEffect(() => {
                return subscribe(forceUpdate);
            }, [subscribe])

            return < OldComponent {...props} {...stateToProps} {...dispatchToProps} />
        }
    }
}
export default connect;