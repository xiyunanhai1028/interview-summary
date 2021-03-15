/*
 * @Author: dfh
 * @Date: 2021-03-15 07:46:41
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 12:38:20
 * @Modified By: dfh
 * @FilePath: /test/test7/express/express/router/index.js
 */
const Layer = require('./layer');
const Route = require('./route');
const url = require('url');
const methods = require('methods');
function Router() {
    const router = function (req, res, next) {
        //请求到来时，匹配到路径后会执行此方法，需要去stack中的依次执行
        router.handler(req, res, next);
    }
    router.stack = [];
    router.__proto__ = proto;
    return router;
}
const proto = {};
proto.route = function (path) {
    const route = new Route;
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;//外层layer和route管理
    this.stack.push(layer);
    return route;
}

methods.forEach(method => {
    proto[method] = function (path, handlers) {
        if(!Array.isArray(handlers)){
            handlers=Array.from(arguments).slice(1);
        }
        const route = this.route(path);
        route[method](handlers)
    }
})


proto.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let idx = 0;
    let removed = '';//用来记录删除的路径
    const next = (err) => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++];

        if (removed.length) {//从内存出来时
            req.url = removed + req.url;
            removed = '';
        }

        if (err) {
            //如果有错误，找到处理错误的中间件
            if (!layer.route && layer.handler.length === 4) {//是中间件,且参数是4,代表的是捕获错误的中间件
                layer.handler(err, req, res, next);
            } else {
                next(err);//继续携带错误走一下层
            }
        } else {
            if (layer.match(pathname)) {//路径匹配，可能是路由，也可能是中间件
                //参数设置
                req.params = layer.params;
                if (!layer.route) {//中间件
                    if (layer.handler.length !== 4) {//正常中间件
                        //进入中间件的时候，需要将中间件的路径移除掉
                        if (layer.path !== '/') {
                            removed = layer.path;
                            req.url = req.url.slice(layer.path.length);
                        }
                        
                        layer.handler(req, res, next);
                    } else {//错误中间件
                        next();
                    }
                } else {//路由
                    if (layer.route.methods[method]) {//路由匹配，方法匹配，否则会多执行
                        layer.handler(req, res, next);
                    } else {
                        next();
                    }
                }
            } else {
                next();
            }
        }

    }
    next();
}

proto.use = function (path, handlers) {
    if (!handlers[0]) {
        handlers = [path];
        path = '/'
    }
    for (let i = 0; i < handlers.length; i++) {
        const layer = new Layer(path, handlers[i]);
        layer.route = undefined;//用来标记是中间件
        this.stack.push(layer);
    }
}

module.exports = Router;