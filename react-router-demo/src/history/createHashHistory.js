/*
 * @Author: dfh
 * @Date: 2021-03-29 14:19:53
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-29 15:05:31
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/history/createHashHistory.js
 */
function createHashHistory() {
    const listeners = [];
    let action;
    const historyStack = [];
    let historyIdx = -1;
    let state = undefined;

    window.addEventListener('hashchange', hashchange);
    function hashchange() {
        const pathname = window.location.hash.slice(1);
        Object.assign(history, { action, location: { pathname, state } });
        if (!action || action === "PUSH") {
            historyStack[++historyIdx] = history.location;
        } else if (action === 'REPLACE') {
            historyStack[historyIdx] = history.location;
        }
        listeners.forEach(listen => listen(history.location));
    }

    function listen(listener) {
        listeners.push(listener);
        return () => {
            const idx = listeners.indexOf(listener);
            listeners.splice(idx, 1);
        }
    }

    function push(pathname, newState) {
        action = 'PUSH';
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = newState;
        }
        window.location.hash = pathname;
    }
    function replace(pathname, newState) {
        action = 'REPLACE';
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = newState;
        }
        window.location.hash = pathname;
    }

    function go(n) {
        action='POP';
        historyIdx+=n;
        const nextLocation=historyStack[historyIdx];
        state=nextLocation.state;
        window.location.hash=nextLocation.pathname;
    }
    function goForward() {
        action='POP';
        go(1);
    }
    function goBack() {
        go(-1);
    }
    const history = {
        action: 'POP',
        location: { pathname: '/', state: undefined },
        push,
        replace,
        go,
        goForward,
        goBack,
        listen
    }
    action = 'PUSH';
    if (window.location.hahs) {
        hashchange();
    } else {
        window.location.hash = '/'
    }
    return history;
}
export default createHashHistory;