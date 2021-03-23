/*
 * @Author: dfh
 * @Date: 2021-03-17 17:01:30
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-17 17:14:44
 * @Modified By: dfh
 * @FilePath: /35.react/src/event.js
 */

/**
 * 为什么要这么做，为什么要时间委托
 * 1.可以做兼容处理，兼容不同浏览器，不同的浏览器event是不一样的
 * 2.可以在事件处理函数和之后做一些事情
 *  2.1.之前：updateQueue.isBatchingUpdate=true;
 *  2.1.之后：updateQueue.isBatchingUpdate=false;
 */

import { updateQueue } from './Component'
export function addEvent(dom, eventType, listener) {
    const store = dom.store || (dom.store = {});
    store[eventType] = listener;
    if (!document[eventType]) {
        //事件委托，不管哪个DOM元素上的事件，最后统一代理到document上去
        document[eventType] = dispatchEvent;
    }
}

let syntheticEvent = {}
function dispatchEvent(event) {
    let { target, type } = event;
    const eventType = `on${type}`;
    updateQueue.isBatchingUpdate = true;
    createSyntheticEvent(event);

    while (target) {//事件冒泡
        const { store } = target;
        const listener = store && store[eventType];
        listener && listener.call(target, syntheticEvent);
        target = target.parentNode;
    }

    for(const key in syntheticEvent){
        syntheticEvent[key]=null;
    }

    updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
    for (const key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
    }
}