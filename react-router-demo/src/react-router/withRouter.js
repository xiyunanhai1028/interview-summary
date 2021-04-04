/*
 * @Author: dfh
 * @Date: 2021-03-30 07:51:13
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:52:53
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/withRouter.js
 */
import RouterContext from './RouterContext';
function withRouter(OldComponent) {
    return props => <RouterContext.Consumer>{
        value => <OldComponent {...props} {...value} />
    }</RouterContext.Consumer>
}
export default withRouter;