/*
 * @Author: dfh
 * @Date: 2021-03-15 07:42:53
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 08:50:23
 * @Modified By: dfh
 * @FilePath: /test/test7/express/express/application.js
 */
const http = require('http');
const Router = require('./router');
const methods = require('methods');
function Application() {
}

Application.prototype.lazy_router=function(){
    if(!this._router) this._router=new Router;
}

methods.forEach(method => {
    Application.prototype[method] = function (path, ...handlers) {
        this.lazy_router();
        this._router[method](path, handlers);
    }
})


Application.prototype.listen = function (...args) {
    const server = http.createServer((req, res) => {
        this.lazy_router();
        //Route不能处理时，调用
        const done = () => {
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this._router.handler(req, res, done);
    })
    server.listen(...args);
}

Application.prototype.use=function(path,...handlers){
    this.lazy_router();
    this._router.use(path,handlers);
}

module.exports = Application;