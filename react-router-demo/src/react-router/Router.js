/*
 * @Author: dfh
 * @Date: 2021-03-29 14:02:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-29 16:10:55
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/Router.js
 */
import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
    }
    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }
        this.unlisten = props.history.listen(location => {
            this.setState({ location });
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const value = {
            location: this.state.location,
            history: this.props.history,
            match:Router.computeRootMatch(this.state.location.pathname)
        }
        return <RouterContext.Provider value={value}>{this.props.children}</RouterContext.Provider>
    }
}
export default Router;