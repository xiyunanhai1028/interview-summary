/*
 * @Author: dfh
 * @Date: 2021-02-24 08:49:02
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 08:57:08
 * @Modified By: dfh
 * @FilePath: /test/test7/6.观察者模式.js
 */
/**
 * 观察者模式：观察者和被观察着之间存在联系，通过将观察者注入到被观察着中，将观察者与被观察建立联系，在被观察中状态改变时，调用内部的
 * 观察者通知它们，其内部是通过发布订阅实现的
 */
class Subject {//被观察中
    constructor(name) {
        this.name = name;
        this.state = '很开心';
        this.observers = [];//存放观察者
    }

    attach(observer) {//注入观察者
        this.observers.push(observer);
    }

    setState(state) {//被观察状态改变
        this.state = state;
        this.observers.forEach(observer => observer.update(this));//通知观察者被观察着状态改变了
    }
}

class Observer {//观察者
    constructor(name) {
        this.name = name;
    }

    update(subject) {
        console.log(`${this.name}观察到${subject.name}的状态为${subject.state}`);
    }
}

const baby=new Subject('baby');
const father=new Observer('father');
const mather=new Observer('mather');

//关联观察者和被观察着
baby.attach(father);
baby.attach(mather);

//被观察着状态改变
baby.setState('我不开心');