/*
 * @Author: dfh
 * @Date: 2021-03-17 16:30:27
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 09:19:54
 * @Modified By: dfh
 * @FilePath: /35.react/src/Component.js
 */
import {findDOM,compareTwoVdom } from './react-dom'

//更新队列
export let updateQueue = {
    isBatchingUpdate: false,//是否处于批量更新模式
    updaters: [],//所有的更新者
    batchUpdate() {//批量更新
        for (let updater of this.updaters) {
            updater.updateComponent();
        }
        this.isBatchingUpdate = false;
        this.updaters.length = 0;
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
        this.emitUpdate();
    }

    //一个组件不管属性变了还是状态变了，都会更新
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
        if (updateQueue.isBatchingUpdate) {//处于批量更新模式
            updateQueue.updaters.push(this);
        } else {//直接更新
            this.updateComponent();
        }
    }

    updateComponent() {
        const { pendingState, cbs, classInstance, nextProps } = this;
        if (nextProps || pendingState.length > 0) {
            shouldUpdate(classInstance, nextProps, this.getState(), cbs);
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

function shouldUpdate(classInstance, nextProps, newState, cbs) {
    let willUpdate = true;//是否需要更新
    if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, newState)) {
        willUpdate = false;
    }
    if (willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    }
    if (nextProps) {
        classInstance.props = nextProps;
    }
    classInstance.state = newState;
    if (willUpdate) {
        classInstance.forceUpdate();
        cbs.forEach(cb => cb());
        cbs.length = 0;
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
        const newVdom=this.render();
        const oldVdm=this.oldVdom;
        const dom=findDOM(oldVdm);
        compareTwoVdom(dom.parentNode,oldVdm,newVdom);
        this.oldVdom=newVdom;
        this.componentDidUpdate&&this.componentDidUpdate();
    }
}

export default Component;