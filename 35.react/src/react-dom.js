/*
 * @Author: dfh
 * @Date: 2021-03-17 15:34:41
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 09:25:43
 * @Modified By: dfh
 * @FilePath: /35.react/src/react-dom.js
 */
import { addEvent } from './event';
import { REACT_TEXT } from './constants'
function render(vdom, container) {
    const dom = createDOM(vdom);
    container.appendChild(dom);
    dom.componentDidMount && dom.componentDidMount();
}
//创建真实DOM
export function createDOM(vdom) {
    const { type, props } = vdom;
    let dom;
    //判断type类型
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {//函数/类组件
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

    vdom.dom = dom;
    return dom;
}

//类组件
function mountClassComponent(vdom) {
    const { type: Clazz, props } = vdom;
    const classInstance = new Clazz(props);
    vdom.classInstance = classInstance;
    classInstance.componentWillMount && classInstance.componentWillMount();
    const renderVdom = classInstance.render();
    classInstance.oldVdom = vdom.oldVdom = renderVdom;
    const dom = createDOM(renderVdom);
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount;
    }
    classInstance.dom = dom;
    return dom;
}

//函数组件
function mountFunctionComponent(vdom) {
    const { type: FunctionComponent, props } = vdom;
    //获取函数组件返回的vdom
    const renderVdom = FunctionComponent(props);
    vdom.oldVdom = renderVdom;
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
            addEvent(dom, key.toLowerCase(), props[key]);
        } else {
            dom[key] = props[key];
        }
    }
}

export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDom) {
    if (!oldVdom && !newVdom) return null;
    if (oldVdom && !newVdom) {
        const currentDOM = findDOM(oldVdom);
        currentDOM && parentDOM.removeChild(currentDOM);
        oldVdom.classInstance && oldVdom.classInstance.componentWillUnMount && oldVdom.classInstance.componentWillUnMount();
    } else if (!oldVdom && newVdom) {
        const newDOM = createDOM(newVdom);
        if (nextDom) {
            parentDOM.inserBefore(newDOM, nextDom);
        } else {
            parentDOM.appendChild(newDOM);
        }
    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
        const oldDOM = findDOM(oldVdom);
        const newDOM = createDOM(newVdom);
        parentDOM.replaceChild(newDOM, oldDOM);
        oldVdom.classInstance && oldVdom.classInstance.componentWillUnMount && oldVdom.classInstance.componentWillUnMount();
    } else {
        updateElement(oldVdom, newVdom)
    }
}

function updateElement(oldVdm, newVdom) {
    if (oldVdm.type === REACT_TEXT) {
        const currentDOM = newVdom.dom = oldVdm.dom;//复用老的节点
        currentDOM.textContent = newVdom.props.content;
    } else if (typeof oldVdm.type === 'string') {//是一个原生组件
        const currentDOM = newVdom.dom = oldVdm.dom;
        //更新属性
        updateProps(currentDOM, newVdom.props);
        //比较儿子们
        updateChildren(currentDOM, oldVdm.props.children, newVdom.props.children);
    } else if (typeof oldVdm.type === 'function') {
        if (oldVdm.type.isReactComponent) {
            updateClassComponent(oldVdm, newVdom);
        } else {
            updateFunctionComponent(oldVdm, newVdom);
        }
    }
}

function updateChildren(parentDOM, oldChildren, newChildren) {
    oldChildren = Array.isArray(oldChildren) ? oldChildren : [oldChildren];
    newChildren = Array.isArray(newChildren) ? newChildren : [newChildren];
    const maxLin = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLin; i++) {
        const nextDOM = oldChildren.find((item, index) => index > i && item && item.dom);
        compareTwoVdom(parentDOM, oldChildren[i], newChildren[i], nextDOM && nextDOM.dom);
    }
}

function updateFunctionComponent(oldVdom, newVdom) {
    const parentDOM = findDOM(oldVdom).parentDOM;
    const { type: FunctionComponent, props } = newVdom;
    const oldRenderVdom = oldVdom.oldVdom;
    const newRenderVdom = FunctionComponent(props);
    compareTwoVdom(parentDOM, oldRenderVdom, newRenderVdom);
    newVdom.oldVdom = newRenderVdom;
}

function updateClassComponent(oldVdm, newVdom) {
    const classInstance = newVdom.classInstance = oldVdm.classInstance;
    newVdom.oldVdom = oldVdm.oldVdom;
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps();
    }
    classInstance.updater.emitUpdate(newVdom.props);
}

export function findDOM(vdom) {
    const { type } = vdom;
    let dom;
    if (typeof type === 'function') {//类组件和函数组件
        dom = findDOM(vdom.oldVdom);
    } else {
        dom = vdom.dom;
    }
    return dom;
}

const ReactDOM = {
    render
}
export default ReactDOM;