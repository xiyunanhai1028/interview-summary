/*
 * @Author: dfh
 * @Date: 2021-03-29 13:35:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:48:21
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Login from './components/Login';
import Protected from './components/Protected';
import { HashRouter as Router, Route, Redirect, Switch, Link } from './react-router-dom'

ReactDOM.render(
    <Router>
        <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to='/user'>个人中心</Link></li>
            <li><Link to='/profile'>文件中心</Link></li>
            <li><Link to='/login'>登陆</Link></li>
        </ul>
        <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/user' component={User} />
            <Protected path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Redirect to='/' />
        </Switch>
    </Router>
    , document.getElementById('root'));