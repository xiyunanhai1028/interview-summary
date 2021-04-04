/*
 * @Author: dfh
 * @Date: 2021-03-30 07:13:26
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:18:32
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/Redirect.js
 */
import React from 'react';
import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';
class Redirect extends React.Component {
    render() {
        const { to } = this.props
        return <RouterContext.Consumer>{
            value => <Lifecycle onMount={() => value.history.push(to)} />
        }</RouterContext.Consumer>
    }
}
export default Redirect;