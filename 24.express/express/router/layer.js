/*
 * @Author: dfh
 * @Date: 2021-03-15 07:51:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 11:25:08
 * @Modified By: dfh
 * @FilePath: /test/test7/express/express/router/layer.js
 */
const pathToRegexp = require('path-to-regexp');

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    this.regExp = pathToRegexp(path, this.keys = []);
}

Layer.prototype.match = function (pathname) {
    if (pathname === this.path) return true;

    //带参数的路由
    const r = pathname.match(this.regExp);
    if (r) {
        const [, ...matchs] = r;//正则匹配的结果
        this.params = {};
        this.keys.forEach((key,index) => {
            this.params[key.name] = matchs[index];
        })
        return true;
    }

    //中间件且是/,或者是中间件以path+'/'开始
    if (!this.route && (this.path === '/' || pathname.startsWith(this.path + '/'))) return true;
    return false
}

module.exports = Layer;