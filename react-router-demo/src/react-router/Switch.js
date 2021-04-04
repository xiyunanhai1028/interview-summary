/*
 * @Author: dfh
 * @Date: 2021-03-29 15:56:49
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:08:55
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/Switch.js
 */
import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';
class Switch extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location } = this.context;
        let match, element;
        React.Children.forEach(this.props.children, child => {
            if (!match && React.isValidElement(child)) {
                match = matchPath(location.pathname, child.props);
                element = child;
            }
        })
        return match ? React.cloneElement(element, { computedMatch: match }) : null;
    }
}
export default Switch;