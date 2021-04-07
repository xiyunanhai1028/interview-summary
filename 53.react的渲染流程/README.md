<!--
 * @Author: dfh
 * @Date: 2021-04-07 07:42:28
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-07 09:00:07
 * @Modified By: dfh
 * @FilePath: /test7/53.react的渲染流程/README.md
-->
### 设计理念
- 跨平台
- 快速响应：异步可中断+增量更新

### react16+ 分为三个阶段
- 调度
- 调和
- 提交

### requestIdleCallback
> 可以使我们在主事件循环处理完的空余事件执行react任务，不影响关键事件

- 1.react向浏览器申请时间片
- 2.浏览器执行高优先级任务，如：渲染，布局，绘制，资源加载，事件响应，动画等
- 3.浏览器把富裕时间片分配给react
- 4.react执行每一个Fiber任务
- 5.执行完每个Fiber任务，都会判断浏览器给的空余时间和是否有下一个Fiber任务，两个有一个不满足，就会把控制权让回给浏览器

```javascript
let nextUnitOfWork=rootFiber;//下一个工作单元
let workInProgress=rootFiber;//正在执行的工作单元

function workLoop(deadline){
    let shouldYield=false;//是否有空余时间
    //判断是否执行
    while(nextUnitOfWork&&!shouldYield){
        nextUnitOfWork=performUnitOfWork(workInProgress);//执行当前工作单元，并且返回下一个工作单元
        shouldYield=deadline.timeRemaining()<1;//
    }

    //如果没有下一个执行单元，并且当前渲染树存在，进行提交，下面会在提交阶段讲
    if(!nextUnitOfWork&&workInProgress){
        commitRoot();
    }

    //循环调度，申请下一次
    requestIdleCallback(workLoop);
}

//调度阶段
requestIdleCallback(workLoop,{timeout:500});//
```

### 调和阶段

- beginWork：把自元素变成Fiber对象
    - createDOM:创建真是DOM，更新属性
    - reconcilerChildren:创建Fiber对象，父亲与大儿子建立关系，儿子们建立关系

- completeUnitOfWork:建立链表关系，通过单链表，firsEffect,nextEffect,lastEffect，将fiber链接起来


- beginWork:

```javascript
function performUnitOfWork(currentFiber){
    beginWork(currentFiber);

    //返回下一个工作单元，有儿子返回儿子，没儿子找叔叔，没叔叔，找白白
    if(currentFiber.child) return currentFiber.child
    while(currentFiber){
        completeUnitOfWork(currentFiber);
        if(currentFiber.sibling) return currentFiber.sibling;
        currentFiber=currentFiber.return;
    }
}

function beginWork(currentFiber){
    if(currentFiber.tag===TAG_ROOT){//根节点
        updateHostRoot(currentFiber);
    }else if(currentFiber.tag===TAG_HOST){//原生节点
        updateHost(currentFiber);
    }else if(currentFiber.tag===TAG_TXT){//文件节点
        updateTxtHost(currentFiber);
    }
}

//根节点
function updateHostRoot(currentFiber){
    const newChildren=currentFiber.props.children;
    reconcilerChildren(currentFiber,newChildren);
}

//原生节点
function updateHost(currentFiber){
    if(!currentFiber.stateNode){
        currentFiber.stateNode=createDOM(currentFiber);
    }
    const newChildren=currentFiber.props.children;
    reconcilerChildren(currentFiber,newChildren);
}

//文本节点
function updateTxtHost(currentFiber){
    if(!currentFiber.stateNode){
        currentFiber.stateNode=createDOM(currentFiber);
    }
}

//创建真是DOM,更新属性
function createDOM(currentFiber){
    if(currentFiber.type===ELEMENT_TXT){
        return document.creatTextNode(currentFiber.props.text);
    }
    const stateNode=document.createElement(currentFiber.type);
    updateProps(stateNode,{},currentFiber.props);
    return stateNode;
}

functiom reconcilerChildren(currentFiber,newChildren){
    let newChildrenIndex=0;//虚拟DOM数组的索引
    let prevSibing;
    while(newChildrenIndex < newChildrem.length){
        const newChild=newChildren[newChildrenIndex];//获取每一个虚拟DOM
        //设置不同的Fiber tag标示
        let tag;
        if(newChild&&newChild.type===ELEMENT_TXT){
            tag=TAG_TXT;
        }else if(newChild&&typeof newChild.type==='string'){
            tag=TAG_HOST;
        }

        let newFiber={
            tag,
            stateNode:null,
            return:currentFiber,
            effectTag:PLACEMENT,//PLACEMENT:更新，删除，移动，更细&移动
            nextEffect:null,
            type:newChild.type,
            props:newChild.props
        }

        //父亲与大儿子建立关系，儿子们之间建立关系
        if(newFiber){
            if(newChildIndex===0){//父亲的chid指向大儿子
                currentFiber.child=newFiber;
            }else{
                prevSibling.sibling=newFiber;//哥哥的sibling指向弟弟
            }
            prevSibling=newFiber;
        }
        newChildrenIndex++;
    }
}
```

- completeUnitOfWork

```javascript
function completeUnitOfWork(currentFiber){
    const returnFiber=currentFiber.return;
    if(returnFiber){
        //把自己的儿子们合并到父亲上
        if(!returnFiber.firstEffect){
            returnFiber.firstEffect=currentFiber.firstEffect;
        }
        if(currentFiber.lastEffect){
            if(returnFiber.lastEffect){//指向儿子的头
                returnFiber.lastEffect.nextEffect=currentFiber.firstEffect;
            }
            returnFiber.lastEffect=currentFiber.lastEffect;
        }

        //把自己合并的父亲上
        const effectTag=currentFiber.effectTag;
        if(effectTag){
            if(returnFiber.lastEffect){
                returnFiber.lastEffect.nextSibling=currentFiber;
            }else{//没有儿子的情况
                returnFiber.firstEffect=currentFiber;
            }
            returnFiber.lastEffect=currentFiber;
        }
    }
}
```

### 提交阶段

```javascript
function commitRoot(){
    let currentFiber=workInProgress.firstEffect;
    while(currentFiber){
        commitWork(currentFiber);
        currentFiber=currentFiber.nextEffect;
    }
    workInProgress=null;
}

function commitWork(currentFiber){
    if(!currentFiber) return;
    const returnFiber=currentFiber.return;
    const parentNode=returnFiber.stateNode;
    if(currentFiber.effectTag===PLACEMENT&&currentFiber.stateNode!=null){
        parentNode.appendChild(currentFiber.stateNode);
    }
    currentFiber.effectTag=null;
}
```




