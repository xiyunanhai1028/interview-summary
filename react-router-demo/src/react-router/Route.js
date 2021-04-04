/*
 * @Author: dfh
 * @Date: 2021-03-29 13:59:49
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:44:24
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/Route.js
 */
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Route extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location, history } = this.context;
        const { component: Component, computedMatch,render,children } = this.props;
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        const routeProps = { location, history, match };
        let renderElement=null;
        if(match){
            if(Component){
                renderElement=<Component {...routeProps}/>
            }else if(render){
                renderElement=render(routeProps);
            }else if(children){
                renderElement=children(routeProps);
            }
        }else{
            if(children){
                renderElement=children(routeProps);
            }
        }
        return renderElement;
    }
}
export default Route;