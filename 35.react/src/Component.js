/*
 * @Author: dfh
 * @Date: 2021-03-17 16:30:27
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-17 17:24:09
 * @Modified By: dfh
 * @FilePath: /35.react/src/Component.js
 */
import { createDOM } from './react-dom'

//更新队列
export let updateQueue = {
    isBatchingUpdate: false,//是否处于批量更新模式
    updaters: [],//所有的更新者
    batchUpdate() {//批量更新
        for (let updater of this.updaters) {
            updater.updateComponent();
        }
        this.isBatchingUpdate = false;
    }
}

//更新者
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingState = [];//等待生效的状态,可能是对象/函数
        this.cbs = [];//回调
    }

    addState(partialState, cb) {
        this.pendingState.push(partialState);
        typeof cb === 'function' && this.cbs.push(cb);
        if (updateQueue.isBatchingUpdate) {//处于批量更新模式
            updateQueue.updaters.push(this);
        } else {//直接更新
            this.updateComponent();
        }
    }

    updateComponent() {
        const { pendingState, cbs, classInstance } = this;
        if (pendingState.length > 0) {
            classInstance.state = this.getState();
            classInstance.forceUpdate();
            cbs.forEach(cb => cb());
            cbs.length = 0;
        }
    }

    getState() {
        const { classInstance, pendingState } = this;
        let { state } = classInstance;
        pendingState.forEach(newState => {
            if (typeof newState === 'function') {
                newState = newState(state);
            }
            state = { ...state, ...newState };
        })
        pendingState.length = 0;
        return state;
    }
}

class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        //每个类组件都有一个更新器
        this.updater = new Updater(this);
    }
    setState(partialState, cb) {
        this.updater.addState(partialState, cb);
    }
    forceUpdate() {
        const renderVdom = this.render();
        updateComponent(this, renderVdom);
    }
}

function updateComponent(clazzInstance, renderVdom) {
    const newDom = createDOM(renderVdom);
    const oldDOM = clazzInstance.dom;
    oldDOM.parentNode.replaceChild(newDom, oldDOM);
    clazzInstance.dom = newDom;
}
export default Component;