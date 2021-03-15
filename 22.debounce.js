/*
 * @Author: dfh
 * @Date: 2021-03-12 17:38:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-12 17:43:03
 * @Modified By: dfh
 * @FilePath: /test/test7/22.debounce.js
 */
function debounce(func, wait, immediate) {
    let args,
        context,
        timeout;

    const debounce = function () {
        context = this;
        args = arguments;
        //清除定时器
        clearTimeout(timeout);
        //判断是否要立即执行
        if (immediate) {
            !timeout&&func.apply(context,args)
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
            timeout = null;
        }, wait);
    }
    return debounce;
}