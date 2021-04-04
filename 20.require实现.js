/*
 * @Author: dfh
 * @Date: 2021-02-26 11:27:57
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 16:22:33
 * @Modified By: dfh
 * @FilePath: /test7/20.require实现.js
 */

/**
 * 1.commonjs规范
 *     1.1.每个js文件都是一个模块
 *     1.2.模块的导出module.exports
 *     1.3.模块的导入require
 * 
 * 2.node中的模块分类
 *     2.1.核心模块
 *     2.2.第三方模块
 *     2.3.自定义模块
 */

const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {};
}


Module.wrapper = [
    '(function(exports,require,module,__filename,__dirname){',
    '})'
]

Module._extensions = {
    '.js'(module) {
        //读取文件
        const content = fs.readFileSync(module.id, 'utf8');
        const code = Module.wrapper[0] + content + Module.wrapper[1];
        const fn = vm.runInThisContext(code);
        const exports = module.exports;
        const dirname = path.dirname(module.id);
        fn.call(exports, exports, req, module, module.id, dirname);
    },
    '.json'(module) {
        const content = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(content);
    }
}
/**
 * 查找文件路径
 * @param {*} fileName 文件名称
 */
Module._resolveFileName = function (fileName) {
    //获取文件绝对路径
    const absPath = path.resolve(__dirname, fileName);
    const isExists = fs.existsSync(absPath);
    //文件路径存在
    if (isExists) return absPath;
    //获取后缀
    const keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
        const tail = keys[i];
        const newPath = absPath + tail;
        if (fs.existsSync(newPath)) return newPath;
    }
    throw new Error('module not exists');
}

/**
 * 加载文件
 */
Module.prototype._load = function () {
    //获取文件后缀
    const tail = path.extname(this.id);
    Module._extensions[tail](this);
}

//缓存文件
Module._cache = {};
function req(fileName) {
    const id = Module._resolveFileName(fileName);
    const cacheModule = Module._cache[id];
    //缓存中存在
    if (cacheModule) return cacheModule.exports;
    const module = new Module(id);
    Module._cache[id] = module;
    module._load();
    return module.exports;
}

const a = req('../b');
console.log(a)