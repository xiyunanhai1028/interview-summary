/*
 * @Author: dfh
 * @Date: 2021-03-17 15:29:00
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 09:24:43
 * @Modified By: dfh
 * @FilePath: /35.react/src/react.js
 */
import Component from './Component';
import { wrapToVdom } from './utils';
function createElement(type, config, children) {
    if (config) {
        delete config.__self;
        delete config.__source;
    }
    let props = { ...config };
    if (arguments.length > 3) {//children是数组
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        props.children = wrapToVdom(children);
    }
    return {
        type,
        props
    }
}
const React = {
    createElement,
    Component
}
export default React;