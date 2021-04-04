/*
 * @Author: dfh
 * @Date: 2021-03-13 09:36:54
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 08:58:39
 * @Modified By: dfh
 * @FilePath: /test7/23.跨域问题处理.JS
 */

/**
 * 1.JSONP解决
 * 存在的问题：只能处理get请求；不安全，xss攻击
 */
function jsonp({ url, params, cb }) {
    const promise = new Promise((resolve) => {
        const script = document.createElement('script');
        window[cb] = function (data) {
            resolve(data);
            document.body.removeChild(script);
        }
        params = { ...params, cb };
        const arrs = [];
        Object.keys(params).forEach(key => {
            arrs.push(`${key}=${params[key]}`);
        })
        console.log(`${url}?${arrs.join('&')}`)
        script.src = `${url}?${arrs.join('&')}`;
        document.body.appendChild(script);
    });
    return promise;
}
jsonp({
    url: 'https://www.baidu.com/s',
    params: { wd: 'hello' },
    cb: 's'
}).then(data => {
    console.log('---data',JSON.stringify(data));
})

/**
 * 2.cors解决
 * 现在最常用的方法
 */
/**设置接受的源 */
res.setHeader('Access-Control-Allow-Origin', origin);
/**设置接受的方法,需要过滤OPTIONS,它是一个询问请求 */
res.setHeader('Access-Control-Allow-Method', 'GET,PUT,DELETE,OPTIONS');
/**设置客户端携带的头有哪些 */
res.setHeader('Access-Control-Allow-Headers', 'name,age');
/**设置允许客户端携带cookie */
res.setHeader('Access-Control-Allow-Credentials', true);
/**设置允许返回的头 */
res.setHeader('Access-Control-Expose-Headers', 'name');
/**预检的存活时间 */
res.setHeader('Access-Control-Max-Age', 6000);


/**
 * 3.postMessage
 */
function load() {
    const iframe = document.getElementById('iframe');
    //发送的数据；地址
    iframe.contentWindow.postMessage('哈哈哈', 'http://localhost:4000');
    //等待接受别人发过来的
    window.onmessage = function (e) {
        console.log(e.data);
    }
}

function load4000() {
    //等待别人发过来的信息
    window.onmessage = function (e) {
        console.log(e.data);
        e.source.postMessage('嘻嘻嘻', e.origin);
    }
}

/**
 * 4.window.name
 * <iframe src='http://localhost:4000/c.htm' frameborder='0' onload='load()' id='iframe'/>
 */
let first = true;
function load() {
    if (first) {
        const iframe = document.getElementById('iframe');
        iframe.src = 'http://localhost:3000/b.html';
        first = false;
    } else {
        console.log(window.contentWindow.name);
    }
}

function c400() {
    window.name = '你好呀';
}

/**
 * 5.hash
 * 通过监听onhashchange事件来实现,a,b同一个域下
 * <iframe src='http://localhost:4000/c.html#hahaha'/>
 */
function a() {
    window.onhashchange = function (e) {
        console.log(location.hash);
    }
}

function b() {
    window.parent.parent.location.hash = location.hash;
}

function c() {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/b.html#xixixi';
    document.body.appendChild(iframe);
}

/**
 * 6.domain实现
 * 主要解决的是：一级域名和二级域名之间的跨域问题
 * a.zf1.cn:3000
 * b.zf1.cn:3000
 * <iframe src='http://a.zf1.cn:3000/b.html' frameborder='0' onload='load()' id='iframe'/>
 */
function a() {
    document.domain = 'zf1.cn';
    function load() {
        console.log(iframe.contentWindow.a);
    }
}

function b() {
    document.domain = 'zf1.cn';
    var a = 100;
}

/**
 * 7.websocket实现
 * 高阶API 不兼容 socket.io
 */
function client() {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onopen = function () {
        socket.send('哈哈哈');
    }
    socket.onmessage = function (e) {
        console.log(e.data);
    }
}

function server() {
    const WebSocket = require('ws');
    const wss = WebSocket.Server({ port: 3000 });
    wss.on('connection', function (ws) {
        ws.on('message', function (data) {
            console.log(data);
            ws.send('嘻嘻嘻');
        })
    })
}

/**
 * 7.nginx实现
 */
