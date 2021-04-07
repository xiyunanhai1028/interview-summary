/*
 * @Author: dfh
 * @Date: 2021-04-07 09:20:25
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-07 10:34:18
 * @Modified By: dfh
 * @FilePath: /test7/55.JS继承的实现方式.js
 */

//类
function Animal(name) {
    //属性
    this.name = name;
    //实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉!');
    }
}

//原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
}


/**
 * 原型继承 
 *  特点：
 *      1.子类的实例是子类的实例，也是父类的实例
 *      2.父类新增原型方法/属性，子类可以访问
 *  缺点：
 *      1.要想为子类新增属性和方法，必须要放在new Animal()这样的语句之后执行，不能放到构造器中
 *      1.无法实现多继承
 *      2.来自原型的所有属性方法可以被访问
 *      3.无法访问私有属性和方法
 * 
 * */
function Cat() { }
Cat.prototype = new Animal('cat');



/**
 * 构造继承
 *  特点：
 *      1.解决了原型继承中，子类实例共享父类引用属性的问题
 *      2.创建子类实例时，可以向父类传递参数
 *      3.可以实现多继承「call多个父类对象」
 * 
 *  缺点：
 *      1.实例并不是父类实例，只是子类实例
 *      2.只能继承父类的实例属性和方法，不能继承原型属性方法
 *      3.无法实现函数复用，每个子类都有父亲实例函数的副本，影响性能
 */

function Dog(name) {
    Animal.call(this);
    this.name = name || '拉布拉多'
}


/**
 * 实例继承
 *  特点：
 *      1.不限制调用方法「不管是new子类，还是子类()」,返回的对象具有相同的效果
 *  
 *  缺点：
 *      1.实例是父类的实例，不是子类的实例
 *      2.不支持多继承
 */
function Pig(name) {
    const instance = new Animal();
    instance.name = name || '佩奇';
    return instance;
}

/**
 * 组合继承：「通过调用父类构造，继承父类属性，保留传参的优点，然后通过将父类实例作为子类原型」
 *  特点：
 *      1.弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
 *      2.即是子类的实例，也是父类的实例
 *      3.不存在引用属性共享问题
 *      4.可以传
 *      5.函数可服用
 * 
 *  缺点：
 *      1.调用了两次父类构造函数，生成了两份实例
 */
function Bird(name) {
    Animal.call(this);
    this.name = name || '乌鸦';
}
Bird.prototype = new Animal();
//组合继承需要修改构造函数执行
Bird.prototype.constructor = Bird;


/**
 * 寄生组合继承：「通过寄生方法，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免组合继承的缺点」
 */
function Snake(name){
    Animal.call(this);
    this.name=name||'青蛇';
}
(function(){
    const Super=function(){};
    Super.prototype=Animal.prototype;
    Snake.prototype=new Super();
})()


