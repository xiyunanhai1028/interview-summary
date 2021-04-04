/*
 * @Author: dfh
 * @Date: 2021-03-30 07:37:06
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:40:05
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/components/Protected.js
 */
import { Route, Redirect } from '../react-router-dom';
function Protected(props) {
    const { path, component: Component } = props;
    return <Route path={path} render={
        routeProps => {
            const login = localStorage.getItem('login');
            return login ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: path } }} />
        }
    } />
}
export default Protected;