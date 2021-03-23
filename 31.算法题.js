/*
 * @Author: dfh
 * @Date: 2021-03-16 18:02:04
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-16 18:36:30
 * @Modified By: dfh
 * @FilePath: /test7/31.算法题.js
 */
/**
 给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前

给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前

    const array = [7, 8, 15, 9, 20, 3, 1, 10];
    findLargestDifference(array)
    function findLargestDifference(array) {
    //TODO
    }//符合条件的两个数字:7和20
 */
function findLargestDifference(array) {
    //找出最大值
    const maxNum = array.reduce((memo, current) => {
        return memo > current ? memo : current
    }, 0);
    //最大值位置-1
    const idx = array.indexOf(maxNum);
    //找到最大值左边数组，左边数组最小值
    const mixNum=array.slice(0, idx).reduce((memo, current) => {
        return memo < current ? memo : current
    })
    return [mixNum,maxNum]
}

let array = [7, 8, 15, 9, 20, 3, 1, 10];

array = findLargestDifference(array)
console.log(array)