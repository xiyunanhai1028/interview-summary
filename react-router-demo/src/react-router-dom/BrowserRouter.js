/*
 * @Author: dfh
 * @Date: 2021-03-29 14:16:57
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:28:16
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router-dom/BrowserRouter.js
 */
import React from 'react';
import { Router } from '../react-router';
import { createBrowserHistory } from '../history';
class BrowserRouter extends React.Component {
    history = createBrowserHistory();
    render() {
        return <Router history={this.history}>{this.props.children}</Router>
    }
}
export default BrowserRouter;