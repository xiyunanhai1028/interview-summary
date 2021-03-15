/*
 * @Author: dfh
 * @Date: 2021-03-15 07:51:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 12:35:33
 * @Modified By: dfh
 * @FilePath: /test/test7/express/express/router/route.js
 */
const Layer = require('./layer');
const methods = require('methods');
function Route() {
    this.stack = [];
    this.methods = {};
}

methods.forEach(method => {
    Route.prototype[method] = function (handles) {
        for (let i = 0; i < handles.length; i++) {
            //内存layer主要存储了事件和方法
            const layer = new Layer('/', handles[i]);
            layer.method = method;
            this.methods[method] = true;
            this.stack.push(layer);
        }
    }
})


Route.prototype.dispatch = function (req, res, done) {
    const method = req.method.toLowerCase();
    let idx = 0;
    const next = (err) => {
        if(err) return done(err);//内存发现错误，直接携带错误推出route层
        if (idx >= this.stack.length) return done();
        const layer = this.stack[idx++];
        if (layer.method === method) {
            layer.handler(req, res, next);
        } else {
            next();
        }
    }
    next();
}

module.exports = Route;