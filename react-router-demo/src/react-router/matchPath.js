/*
 * @Author: dfh
 * @Date: 2021-03-29 15:06:31
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-29 16:13:54
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/matchPath.js
 */
import PathToRegexp from 'path-to-regexp';

let cache = {}
function compilePath(path, options) {
    const cacheKey = path + JSON.stringify(options);
    if (cache[cacheKey]) return cache[cacheKey];
    const keys = [];
    const regexp = PathToRegexp(path, keys, options);
    const result = { keys, regexp };
    cache[cacheKey] = result;
    return result
}

function matchPath(pathname, options = {}) {
    const { path = '/', exact = false, strict = false, sensitive = false } = options;
    const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
        path,
        url,
        isExact,
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {})
    }
}
export default matchPath;
