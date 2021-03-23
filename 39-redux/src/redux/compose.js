/*
 * @Author: dfh
 * @Date: 2021-03-22 18:02:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-22 18:03:10
 * @Modified By: dfh
 * @FilePath: /39-redux/src/redux/compose.js
 */
function compose(...fns) {
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
export default compose;