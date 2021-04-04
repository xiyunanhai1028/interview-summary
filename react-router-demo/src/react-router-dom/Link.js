/*
 * @Author: dfh
 * @Date: 2021-03-30 07:22:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:27:04
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router-dom/Link.js
 */
import React from 'react';
import { _RouterContext as RouterContext } from '../react-router';

class Link extends React.Component {
    render() {
        return <RouterContext.Consumer>{
            ({ history }) => <a onClick={event => {
                event.preventDefault();
                history.push(this.props.to);
            }} {...this.props}>{this.props.children}</a>
        }</RouterContext.Consumer>
    }
}
export default Link;