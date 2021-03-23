/*
 * @Author: dfh
 * @Date: 2021-03-17 15:34:41
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-17 17:02:27
 * @Modified By: dfh
 * @FilePath: /35.react/src/react-dom.js
 */
import {addEvent} from './event';
function render(vdom, container) {
    const dom = createDOM(vdom);
    container.appendChild(dom);
}
//创建真实DOM
export function createDOM(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') { //vdom是字符串或者数组
        return document.createTextNode(vdom);
    }
    const { type, props } = vdom;

    let dom;
    //判断type类型
    if (typeof type === 'function') {//函数/类组件
        if (type.isReactComponent) {//类组件
            return mountClassComponent(vdom);
        } else {//函数组件
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);
    }
    updateProps(dom, props);

    if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children
    } else if (typeof props.children === 'object' && props.children.type) {
        render(props.children, dom);
    } else if (Array.isArray(props.children)) {
        reconcileChildren(props.children, dom)
    } else {
        document.textContent = props.children ? props.children.toString() : '';
    }
    return dom;
}

//类组件
function mountClassComponent(vdom) {
    const { type: Clazz, props } = vdom;
    const classInstance = new Clazz(props);
    const renderVdom = classInstance.render();
    const dom = createDOM(renderVdom);
    classInstance.dom = dom;
    return dom;
}

//函数组件
function mountFunctionComponent(vdom) {
    const { type: FunctionComponent, props } = vdom;
    //获取函数组件返回的vdom
    const renderVdom = FunctionComponent(props);
    //获取真实DOM
    return createDOM(renderVdom);
}

//儿子们的渲染
function reconcileChildren(childrenVdom, dom) {
    for (let i = 0; i < childrenVdom.length; i++) {
        const childVdom = childrenVdom[i];
        render(childVdom, dom);
    }
}

//更新属性
function updateProps(dom, props) {
    for (const key in props) {
        if (key === 'children') continue;//不在这里处理
        if (key === 'style') {
            const styleObj = props['style'];
            for (const attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else if (key.startsWith('on')) {
            addEvent(dom,key.toLowerCase(),props[key]);
        } else {
            dom[key] = props[key];
        }
    }
}

const ReactDOM = {
    render
}
export default ReactDOM;