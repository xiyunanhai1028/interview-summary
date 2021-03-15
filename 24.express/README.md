<!--
 * @Author: dfh
 * @Date: 2021-03-15 08:24:40
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-15 08:28:37
 * @Modified By: dfh
 * @FilePath: /test/test7/express/README.md
-->
## express

### 1.基本功能实现

#### 1.1.测试1:

```javascript
const express=require('./express');
const app=express();

app.get('/',(req,res,next)=>{
    console.log(1);
    next();
    console.log(2)
},(req,res,next)=>{
    console.log(3);
    next();
    console.log(4)
},(req,res,next)=>{
    console.log(5);
    next();
    console.log(6)
})

app.get('/',(req,res,next)=>{
    res.end('ok');
})
app.listen(3000)
```

日志：

> http://localhost:3000/

```javascript
1
3
5
6
4
2
```

#### 1.2.测试2:

```javascript
const express = require('./express');
const app = express();

app.get('/', (req, res, next) => {
    console.log('get');
    res.end('get')
})
app.post('/', (req, res, next) => {
    console.log('post');
    res.end('post')
})
app.listen(3000)
```

日志:

> curl -v -X GET http://localhost:3000 

```javascript
get
```

> curl -v -X POST http://localhost:3000 

```javascript
post
```

#### 1.3.实现

```javascript
.
├── README.md
├── express
│   ├── application.js
│   ├── express.js
│   ├── package.json
│   └── router
│       ├── index.js
│       ├── layer.js
│       └── route.js
```

##### 1.3.1.`express.js`

```javascript
const Application = require('./application');
function createApplication() {
    return new Application();
}
module.exports = createApplication;
```

##### 1.3.2.`application.js`

```javascript
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

module.exports = Application;
```

##### 1.3.3.`router/index.js`

```javascript
const Layer = require('./layer');
const Route = require('./route');
const url = require('url');
const methods = require('methods');
function Router() {
    this.stack = [];//存放Layer
}

Router.prototype.route = function (path) {
    const route = new Route;
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;//外层layer和route管理
    this.stack.push(layer);
    return route;
}

methods.forEach(method => {
    Router.prototype[method] = function (path, handlers) {
        const route = this.route(path);
        route[method](handlers)
    }
})


Router.prototype.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method=req.method.toLowerCase();
    let idx = 0;
    const next = () => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++]
        if (layer.match(pathname) && layer.route.methods[method]) {
            layer.handler(req, res, next);
        } else {
            next();
        }
    }
    next();
}

module.exports = Router;
```

##### 1.3.4.`router/layer.js`

```javascript
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match=function(pathname){
    return this.path === pathname
}

module.exports = Layer;
```

##### 1.3.5.`router/route.js`

```javascript
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
            const layer = new Layer('', handles[i]);
            layer.method = method;
            this.methods[method] = true;
            this.stack.push(layer);
        }
    }
})


Route.prototype.dispatch = function (req, res, done) {
    const method = req.method.toLowerCase();
    let idx = 0;
    const next = () => {
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
```

### 2.中间件use

#### 2.1.测试

```javascript
const express = require('./express');
const app = express();

app.use(function(req,res,next){
    console.log('所有请求都要经过我');
    next();
});

app.use('/user',function(req,res,next){
    console.log('user开头的请求经过我');
    next()
});

app.use('/cart',function(req,res,next){
    console.log('cart开头的请求经过我');
    next()
});

app.use('/user/add',function(req,res,next){
    console.log('user/add');
    res.end('/user/add')
});

app.use('/user/cart',function(req,res,next){
    console.log('user/cart');
    res.end('/user/cart')
});

app.listen(3000)
```

日志：

> http://localhost:3000/user/add

```javascript
所有请求都要经过我
user开头的请求经过我
user/add
```

#### 2.2.实现

##### 2.2.1.`application.js`

```javascript
Application.prototype.use=function(path,...handlers){
    this.lazy_router();
    this._router.use(path,handlers);
}
```

##### 2.2.2.`router/index.js`

```javascript
Router.prototype.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let idx = 0;
    const next = () => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++]
+       if (layer.match(pathname)) {//路径匹配，可能是路由，也可能是中间件
+           if (!layer.route) {//中间件
+               layer.handler(req,res,next);
+           } else {//路由
+               if (layer.route.methods[method]) {//路由匹配，方法匹配，否则会多执行
+                   layer.handler(req, res, next);
+               } else {
+                   next();
+               }
+           }
        } else {
            next();
        }
    }
    next();
}

+ Router.prototype.use = function (path, handlers) {
+    if (!handlers[0]) {
+       handlers = [path];
+       path = '/'
+   }
+   for (let i = 0; i < handlers.length; i++) {
+       const layer = new Layer(path, handlers[i]);
+       layer.route = undefined;//用来标记是中间件
+       this.stack.push(layer);
+   }
+ }
```

##### 2.2.3.`router/layer.js`

```javascript
Layer.prototype.match = function (pathname) {
    if (pathname === this.path) return true;
    //中间件且是/,或者是中间件以path+'/'开始
    if (!this.route && (this.path === '/' || pathname.startsWith(this.path + '/'))) return true;
    return false
}
```

### 3.错误处理

#### 3.1.测试

```javascript
const express = require('./express');
const app = express();

app.use(function (req, res, next) {
    console.log('所有请求都要经过我');
    next();
});

app.use('/user', function (req, res, next) {
    console.log('user开头的请求经过我');
    next()
});

app.use('/cart', function (req, res, next) {
    console.log('cart开头的请求经过我');
    next()
});

app.use('/user/add', function (req, res, next) {
    next('user/add 错误了，哈哈哈')
});

app.use('/user/cart', function (req, res, next) {
    next('user/cart 错误了，嘻嘻嘻')
});

app.use((err, req, res, next) => {
    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end(err);
})

app.listen(3000)
```

日志：

> http://localhost:3000/user/add

```javascript
页面：
user/add 错误了，哈哈哈

日志：
所有请求都要经过我
user开头的请求经过我
```

#### 3.2.实现

##### 3.2.1.`router/route.js`

```javascript
Route.prototype.dispatch = function (req, res, done) {
    const method = req.method.toLowerCase();
    let idx = 0;
+    const next = (err) => {
+       if(err) return done(err);//内存发现错误，直接携带错误推出route层
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
```

##### 3.2.2.`router/index.js`

```javascript
Router.prototype.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let idx = 0;
    const next = (err) => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++]
        if (err) {
            //如果有错误，找到处理错误的中间件
            if (!layer.route && layer.handler.length === 4) {//是中间件,且参数是4,代表的是捕获错误的中间件
                layer.handler(err, req, res, next);
            } else {
                next(err);//继续携带错误走一下层
            }
        } else {
            if (layer.match(pathname)) {//路径匹配，可能是路由，也可能是中间件
                if (!layer.route) {//中间件
                    if (layer.handler.length !== 4) {//正常中间件
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
```

### 4.带参路由

#### 4.1.测试

```javascript
const express = require('./express');
const app = express();

app.use(function(req,res,next){
    res.send=function(data){
        if(typeof data==='object'&&data!==null){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data));
        }
    }
    next();
})
app.get('/user/:id/:name/detail',function (req, res, next) {
    const params=req.params;
    console.log(params)
    res.send(params);
});


app.listen(3000)
```

日志：

>http://localhost:3000/user/123/zhangsan/detail

```javascript
{ id: '123', name: 'zhangsan' }
```

#### 4.2.实现

##### 4.2.1.`router/layer.js`

```javascript
+ const pathToRegexp = require('path-to-regexp');

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
+   this.regExp = pathToRegexp(path, this.keys = []);
}

Layer.prototype.match = function (pathname) {
    if (pathname === this.path) return true;

    //带参数的路由
+   const r = pathname.match(this.regExp);
+   if (r) {
+       const [, ...matchs] = r;//正则匹配的结果
+       this.params = {};
+       this.keys.forEach((key,index) => {
+           this.params[key.name] = matchs[index];
+       })
+       return true;
+   }

    //中间件且是/,或者是中间件以path+'/'开始
    if (!this.route && (this.path === '/' || pathname.startsWith(this.path + '/'))) return true;
    return false
}
```

##### 4.2.2.`router/index.js`

```javascript
Router.prototype.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let idx = 0;
    const next = (err) => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++]
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
+               req.params = layer.params;
                if (!layer.route) {//中间件
                    if (layer.handler.length !== 4) {//正常中间件
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
```

### 5.二级路由

#### 5.1.实例

- `server.js`

```javascript
const express = require('express');
const user = require('./routes/user');
const home = require('./routes/home');
const app = express();

app.use('/home', home);
app.use('/user', user);

app.listen(3000)
```

- `routes/home.js`

```javascript
const express=require('express');
const router=express.Router()

router.get('/add',function(req,res){
    res.end('/home/add')
})

router.get('/remove',function(req,res){
    res.end('/home/remove')
})

module.exports=router;
```

- `routes/user.js`

```javascript
const express=require('express');
const router=express.Router()

router.get('/add',function(req,res){
    res.end('/user/add')
})

router.get('/remove',function(req,res){
    res.end('/user/remove')
})

module.exports=router;
```

#### 5.2.实现

##### 5.2.1.`express.js`

```javascript
  const Application = require('./application');
+ const Router = require('./router');
  function createApplication() {
     return new Application();
  }
+ createApplication.Router = Router;
  module.exports = createApplication;
```

##### 5.2.2.`router/index.js`

```javascript
const Layer = require('./layer');
const Route = require('./route');
const url = require('url');
const methods = require('methods');
function Router() {
+   const router = function (req, res, next) {
        //请求到来时，匹配到路径后会执行此方法，需要去stack中的依次执行
+       router.handler(req, res, next);
+   }
+   router.stack = [];
+   router.__proto__ = proto;
+   return router;
}
  
+ const proto = {};
+ proto.route = function (path) {
    const route = new Route;
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;//外层layer和route管理
    this.stack.push(layer);
    return route;
}

methods.forEach(method => {
+   proto[method] = function (path, handlers) {
+       if(!Array.isArray(handlers)){
+           handlers=Array.from(arguments).slice(1);
+       }
        const route = this.route(path);
        route[method](handlers)
    }
})


+ proto.handler = function (req, res, done) {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let idx = 0;
+   let removed = '';//用来记录删除的路径
    const next = (err) => {
        if (idx >= this.stack.length) return done();//推出
        const layer = this.stack[idx++];

+       if (removed.length) {//从内部出来时
+           req.url = removed + req.url;
+           removed = '';
+       }

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
+                       if (layer.path !== '/') {
+                           removed = layer.path;
+                           req.url = req.url.slice(layer.path.length);
+                       }
                        
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
```



