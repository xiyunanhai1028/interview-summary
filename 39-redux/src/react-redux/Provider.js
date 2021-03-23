/*
 * @Author: dfh
 * @Date: 2021-03-22 16:52:50
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 17:09:46
 * @Modified By: dfh
 * @FilePath: /39-redux/src/react-redux/Provider.js
 */
import React from 'react';
import ReactReduxContext from './ReactReduxContext';
class Provider extends React.Component {
    render() {
        return <ReactReduxContext.Provider value={{store:this.props.store}}>
            {this.props.children}
        </ReactReduxContext.Provider>
    }
}
export default Provider;