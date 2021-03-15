/*
 * @Author: dfh
 * @Date: 2021-03-15 07:42:47
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 11:36:48
 * @Modified By: dfh
 * @FilePath: /test/test7/express/express/express.js
 */
const Application = require('./application');
const Router = require('./router');
function createApplication() {
    return new Application();
}
createApplication.Router = Router;
module.exports = createApplication;