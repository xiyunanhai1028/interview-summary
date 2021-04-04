/*
 * @Author: dfh
 * @Date: 2021-03-29 14:19:45
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-29 14:55:32
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/history/createBrowserHistory.js
 */
function createBrowserHistory() {
    const globalHistory = window.history;
    const listeners = [];
    let action;
    let state;
    function listen(listener) {
        listeners.push(listener);
        return () => {
            const idx = listeners.indexOf(listener);
            listeners.splice(idx, 1);
        }
    }
    function push(pathname, nextState) {
        action = 'PUSH';
        if (typeof pathname === 'object') {
            pathname = pathname.pathname;
            state = pathname.state;
        } else {
            state = nextState;
        }
        globalHistory.pushState(state, null, pathname);
        const location = { state, pathname };
        notify({ action, location })

    }

    function notify(newHistory) {
        Object.assign(history, newHistory);
        listeners.forEach(listen => listen(history.location));
    }

    function go(n) {
        globalHistory.go(n);
    }

    function goBack() {
        go(-1)
    }
    function goForward() {
        go(1)
    }

    const history = {
        action: 'POP',
        location: { pathname: window.location.pathname, state: globalHistory.state },
        push,
        go,
        goBack,
        goForward,
        listen
    }
    return history;
}
export default createBrowserHistory;