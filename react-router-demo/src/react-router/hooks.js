/*
 * @Author: dfh
 * @Date: 2021-03-30 07:54:22
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:58:40
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/hooks.js
 */
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export function useParams() {
    const match = React.useContext(RouterContext).match;
    return match ? match.params : {}
}

export function useLocation() {
    return React.useContext(RouterContext).location;
}

export function useHistory() {
    return React.useContext(RouterContext).history;
}

export function useRouteMatch(options) {
    const location = useLocation();
    const match = React.useContext(RouterContext).match;
    return options ? matchPath(location.pathname, options) : match;
}