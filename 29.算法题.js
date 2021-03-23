/*
 * @Author: dfh
 * @Date: 2021-03-16 16:34:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-16 16:46:28
 * @Modified By: dfh
 * @FilePath: /test7/29.算法题.js
 */
/**
    题目描述：
        对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。

    示例 1：

        输入：A = [1,2,0,0], K = 34
        输出：[1,2,3,4]
        解释：1200 + 34 = 1234
    示例 2：

        输入：A = [2,7,4], K = 181
        输出：[4,5,5]
        解释：274 + 181 = 455


    示例 3：
        输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
        输出：[1,0,0,0,0,0,0,0,0,0,0]
        解释：9999999999 + 1 = 10000000000


    提示：

        1 <= A.length <= 10000
        0 <= A[i] <= 9
        0 <= K <= 10000
        如果 A.length > 1，那么 A[0] != 0


var addToArrayForm = function (A, K) {//TODO}
 */

function addToArrayForm(A, K) {
    A = A.join('');
    let sum = A * 1 + K;
    sum = sum + '';
    const result = []
    for (let i = 0; i < sum.length; i++) {
        result.push(sum.slice(i, i + 1) * 1);
    }
    return result;
}

const A = [9,9,9,9,9,9,9,9,9,9], K = 1;
const result = addToArrayForm(A, K);
console.log(result)