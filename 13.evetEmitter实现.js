/*
 * @Author: dfh
 * @Date: 2021-02-25 10:00:54
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-25 10:39:09
 * @Modified By: dfh
 * @FilePath: /test/test7/13.evetEmitter实现.js
 */
function EventEmitter() {
    this._events = {};
}

EventEmitter.prototype.on = function (eventName, cb) {
    //_events不存在时
    if (!this._events) this._events = {};
    //newListener在每次on的时候触发
    if(eventName!=='newListener'){
        this.emit('newListener',eventName);
    }
    //判断是否已经存在对象的事件名
    if (!this._events[eventName]) {
        this._events[eventName] = [cb];
    } else {
        this._events[eventName].push(cb);
    }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
    if (!this._events) this._events = {};
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => fn(...args));
    }
}

EventEmitter.prototype.off = function (eventName, cb) {
    if (!this._events) this._events = {};
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(event => event !== cb && event.l !== cb);
    }
}

EventEmitter.prototype.once = function (eventName, cb) {
    if (!this._events) this._events = {};
    const once = (...args) => {//箭头函数，以免this指向出问题
        cb(...args);
        this.off(eventName, once);//这里需要销毁的时once，因此on的时候时once
    }
    once.l = cb;//防止once了以后调用off方法，这个需要用这个标识来清除掉
    this.on(eventName, once);
}

module.exports = EventEmitter;