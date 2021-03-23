/*
 * @Author: dfh
 * @Date: 2021-03-17 15:29:00
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-17 16:35:49
 * @Modified By: dfh
 * @FilePath: /35.react/src/react.js
 */
import Component from './Component';
function createElement(type, config, children) {
    if (config) {
        delete config._self;
        delete config._source;
    }
    let props = { ...config };
    if (arguments.length > 3) {//children是数组
        children = Array.prototype.slice.call(arguments, 2);
    }
    props.children = children;
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