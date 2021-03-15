/*
 * @Author: dfh
 * @Date: 2021-02-23 16:34:03
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-24 08:46:53
 * @Modified By: dfh
 * @FilePath: /test/test7/2.检测数据类型.js
 */
function checkType(type) {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let utilsType = {}
const types = ['Number', 'Boolean', 'String', 'Object', 'Array','Symbol','RegExp','Null','Undefined'];
types.forEach(type => {
    utilsType[`is${type}`] = checkType(type);
})
console.log(utilsType.isNumber(1));
console.log(utilsType.isBoolean(true));
console.log(utilsType.isString('1'));
console.log(utilsType.isObject({ name: 1 }));
console.log(utilsType.isArray([1, 2]));
console.log(utilsType.isSymbol(Symbol()));
console.log(utilsType.isRegExp(new RegExp()));
console.log(utilsType.isNull(null));
console.log(utilsType.isUndefined(undefined));

