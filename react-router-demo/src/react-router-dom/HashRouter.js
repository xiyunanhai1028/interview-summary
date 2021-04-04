/*
 * @Author: dfh
 * @Date: 2021-03-29 13:58:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-29 15:05:04
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router-dom/HashRouter.js
 */
import React from 'react';
import { createHashHistory } from '../history';
import { Router } from '../react-router';

class HashRouter extends React.Component {
    history = createHashHistory();
    render() {
        return <Router history={this.history}>{this.props.children}</Router>
    }
}
export default HashRouter;