/*
 * @Author: dfh
 * @Date: 2021-03-19 16:03:32
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-19 16:28:59
 * @Modified By: dfh
 * @FilePath: /test7/37.数据类型检测.js
 */
/**
 * typeof
 *  - 直接在计算机底层基于数据类型的值（二进制）进行检测
 *  - typeof null==='object',对象存储在计算机中，都是以000开始的二进制存储，null也是，所以检测出来的结果是object
 *  - typeof 普通对象/数组对象/正则对象/日期对象==='object'
 * 
 * instanceof 
 *  - 底层机制：只要当前类出现在实例的原型链上，结果都是true
 *  - 由于我们可以肆意的修改原型的指向，所以检测出来的结果是不准的
 *  - 不能检测基本数据类型
 * 
 * constructor
 *  - 用起来看似比instanceof还好用一些（基本类型支持）
 *  - constructor可以随便改，所以也不准
 * 
 * Object.prototype.toString.call
 *  - 标准检测数据类型的方法：Object.prototype.toString不是转换为字符串，是返回当前实例所属类的信息
 *  - 标准检测的办法：[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RegExp/Date,Function]
 */

function instance_of(example, classFunc) {
    let classFuncPrototype = classFunc.prototype,
        proto = Object.getPrototypeOf(example);//example.__proto__
    while (true) {
        if (proto === null) {
            //Object.prototype.__proto__==>null
            return false;
        }
        if (proto === classFuncPrototype) {
            //查找过程中发现有，则证明实例是这个类的实例
            return true;
        }
        proto = Object.getPrototypeOf(proto);//example.__proto__.__proto__
    }
}


(function () {
    const class2type = {};
    const toString = class2type.toString;//Object.prototype.toString;
    //设定数据类型的映射表
    const types = ['Number', 'String', 'Boolean', 'Object', 'Function', 'Array', 'Date', 'Regexp', 'Error', 'Symbol'];
    types.forEach(type => {
        class2type[`[object ${type}]`] = type.toLowerCase();
    });
    function toType(obj) {
        //传递的值是null或者undefined，就返回对应的字符串
        if (obj == null) return obj + '';
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
    }
    window.toType=toType;
})()