/*
 * @Author: dfh
 * @Date: 2021-03-25 15:19:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-25 15:32:34
 * @Modified By: dfh
 * @FilePath: /test7/49.jwt/jwt.js
 */
const jwt = {
    //编码
    encode(payload, secret) {
        const header = this.toBase64(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
        const content = this.toBase64(JSON.stringify(payload));
        //签名：header.content
        const sign = this.sign([header, content].join('.'), secret);
        //header.content.sign
        return [header, content, sign].join('.');
    },
    decode(token, secret) {//解码
        let [header, content, sign] = token.split('.');
        header = JSON.parse(this.fromBase64ToStr(header));
        content = JSON.parse(this.fromBase64ToStr(content));
        if (sign === this.sign([header, content].join('.')), secret) {
            return true;
        }
        return false;
    },
    toBase64(str) {//转base64
        return Buffer.from(str).toString('base64');
    },
    sign(str, secret) {//签名
        return require('crypto').createHmac('sh256', secret).update(str).digest('base64');
    },
    fromBase64ToStr(base64) {
        return Buffer.from(base64, 'base64').toJSON('utf8');
    }
}