/*
 * @Author: dfh
 * @Date: 2021-04-07 10:44:15
 * @LastEditors: dfh
 * @LastEditTime: 2021-04-07 10:49:18
 * @Modified By: dfh
 * @FilePath: /test7/56.indexOf.js
 */
var index = [1,2,3].indexOf(2);
function indexOf(index){
    if(Array.prototype.indexOf){
        console.log(111)
        return this.indexOf(index);
    }
    for(let i=0;i<this.length;i++){
        if(this[i]===2) return index;
    }
}
console.log(index)