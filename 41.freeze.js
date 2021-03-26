/*
 * @Author: dfh
 * @Date: 2021-03-24 15:21:04
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 15:24:31
 * @Modified By: dfh
 * @FilePath: /test7/41.freeze.js
 */
/**
Object.freeze方法可以冻结一个对象，冻结是指不能向这个对象添加新的属性，不能修改现有属性的值，不能删除属性，甚至不能修改这个对象现有属性的可枚举性，可配置性，可写性。换句话说，这个对象永远是不可变的，此方法返回被冻结的对象。Object.freeze是浅冻结

Object.defineProperty()方法定义对象属性的特性，比如是否删除，是否修改，是否可枚举等
Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置
 */
function freeze(obj){
    Object.keys(obj).forEach(key=>{
        Object.defineProperty(obj,key,{
            writable:false
        })
    })
    Object.seal(obj);
    return obj;
}