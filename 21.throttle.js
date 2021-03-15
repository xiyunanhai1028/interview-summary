/*
 * @Author: dfh
 * @Date: 2021-03-12 17:16:34
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-12 17:28:07
 * @Modified By: dfh
 * @FilePath: /test/test7/21.throttle.js
 */
function throttle(func, wait, options) {
    let args,
        context,
        timeout,
        previous = 0;//最后一次执行时间

    const later = function () {
        previous = options.leading === false ? 0 : Date.now();
        func.apply(context, args);
    }
    const throttled = function () {
        context = this;
        args = arguments;
        const now = Date.now();
        //第一次，且配置第一次不执行
        if (!previous && options.leading === false) previous = Date.now();
        const remaning = wait - (now - previous);//等待时间与间隔时间的差值
        if (remaning <= 0) {//第一次
            if (timeout) {//清除定时器
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(context, args);
            previous = now;//重置最后一次执行时间
        } else if (!timeout && options.tailing !== false) {//没有定时器在执行且需要最后一次执行
            timeout = setTimeout(later, remaning);
        }
    }
    return throttled;
}