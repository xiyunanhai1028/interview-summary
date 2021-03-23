/*
 * @Author: dfh
 * @Date: 2021-03-19 16:38:23
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-19 16:51:44
 * @Modified By: dfh
 * @FilePath: /test7/38.JS中三类循环比较.js
 */
/**
 * JS中三类循环对比以及性能分析？
 * 
 * for循环及forEach底层原理
 *  - for循环是自己控制循环过程
 *  - 基于var声明的时候，for和while性能差不多，「不确定循环次数的情况下使用while」
 *  - 基于let声明的时候，for循环性能更好，「原理：没有创建全局不释放的变量」
 *  - 重写for-each
 * 
 * for in循环的bug及解决方案
 *  - 迭代所有可枚举属性「公有&私有」，按照原型链一级级查找很耗性能
 *  - 问题很多：不能迭代Symbol属性，迭代顺序会以数字属性优先，公有可枚举的「一般是自定义属性」属性也会进行迭代
 * 
 * for of循环的底层机制
 *  - 迭代器iterator规范「具备next方法，每次执行返回对象，具备value/done属性」
 *  - 让对象具备可迭代性且使用for of循环
 *  
 */