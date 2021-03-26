<!--
 * @Author: dfh
 * @Date: 2021-03-25 15:09:12
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-25 15:19:17
 * @Modified By: dfh
 * @FilePath: /test7/49.jwt/jwt.md
-->
### JWT
JWT是用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。
因为数字签名的存在，这些信息是可信的，JWT使用HMAC算法或者RSA的公司密钥对进行签名

### JWT组成
> JWT由header,Payload,Signture三部分组成

header
- typ:类型
- alg:算法

Payload:负载，其实就是数据

Signture:签名
```javascript
const sign=this.sign([header,content].join('.').secret);
sign(str,secret){//签名
    return require('crypto').createHmac('sh256',sign).update(str).disget('base64');
}
```

### 过程
> base64(header).base64(Payload).base64(Signature);