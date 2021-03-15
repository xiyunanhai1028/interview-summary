/*
 * @Author: dfh
 * @Date: 2021-02-25 11:36:05
 * @LastEditors: dfh
 * @LastEditTime: 2021-02-26 11:16:11
 * @Modified By: dfh
 * @FilePath: /test/test7/19.buffer.js
 */
/**
 *  1.编码的发展
 *   一个字节由8个位组成，gbk中一个汉子2个字节，utf8中一个汉字3个字节
 *     ASCII 编码
 *     GB2312
 *     GBK
 *     GB18030
 *     Unicode
 *     UTF-8
 *   Node中不支持GBK编码，我们需要将GBK转为UTF8编码,可以用`iconv-lite`库实现转码
 */

/**
 * 进制转化
 */
//任意进制转成十进制
console.log(parseInt('20', 10));//20
console.log(parseInt('1', 2));//1
console.log(parseInt('20', 16));//32

//十进制转成任意进制
console.log((3).toString(2));//11
console.log((77).toString(8));//115
console.log((77).toString(16));//4d
console.log((17).toString(8));//21

/**
 * Buffer的应用
 * 
 * 1.定义Buffer
 *  Buffer.alloc()
 *  Buffer.from('')
 *  Buffer.from([])
 * 
 * 2.常用方法
 *  buff.toString()
 *  buff.fill()
 *  buff.slice()
 *  buff.copy()
 *  Buffer.concat()
 *  Buffer.isBuffer()
 *  indexOf
 */
//定义buffer的三种方法
const b1 = Buffer.alloc(6);
const b2 = Buffer.from('张三');
const b3 = Buffer.from([1, 2, 3]);
const b4 = Buffer.from('，你好');
const b5=Buffer.from('你好,张三')

//buffer中常用方法
console.log(b2.toString('utf-8', 0, 3));//张

console.log(b2.slice(0, 3).toString());//<Buffer e5 bc a0> -> 张

b2.copy(b1, 0, 0, 6);//targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number
console.log(b1.toString());

/**
 * Buffer拷贝
 * @param {*} targetBuffer 目标buff
 * @param {*} targetStart 目标开始位置
 * @param {*} sourceStart 资源开始位置
 * @param {*} sourceEnd 资源结束位置
 */
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i];
    }
}


console.log(Buffer.concat([b2, b4]).toString());//张三，你好


/**
 * 
 * @param {*} list 数组buff
 * @param {*} totalLength 总共几个buff
 */
Buffer.prototype.concat = function (list, totalLength) {
    if (list.length === 0) return list[0];
    totalLength = totalLength || list.reduce((memo, item) => memo + item.length, 0);
    const buff = Buffer.alloc(totalLength);
    let index = 0;
    for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        for (const byte of buf) {
            buff[index++] = byte;
        }
    }
    return buff;
}

console.log(Buffer.isBuffer(b1));//true

console.log(b2.length);//6

console.log(b2.indexOf('三'));//0


/**
 * indexOf+slice
 * @param {*} sep 分隔符
 */
Buffer.prototype.split=function(sep){
    //获取分隔符长度
    const len=Buffer.from(sep).length;
    //当前位置
    let current=0;
    //当前偏移
    let offset=0;
    //存储数据
    const arr=[];
    while((current=this.indexOf(sep,offset))!==-1){
        arr.push(this.slice(offset,current));
        offset=current+len;
    }
    //最后一段
    arr.push(this.slice(offset));
    return arr
}

console.log(b5.split(',')[0].toString());//你好

/**
 * base64
 *  base64编码没有加密功能
 *  base64转化后的结果会比之前大1/3
 *  不是所有图片都会转化成base64
 */
//b是16进制
const b=Buffer.from('张');//<Buffer e5 bc a0>
//转化为2进制
console.log((0xe5).toString(2));//11100101
console.log((0xbc).toString(2));//10111100
console.log((0xa0).toString(2));//10100000

//base64是4*6,将3*8->4*6
//11100101 10111100 10100000->111001 011011 110010 100000

//转化为10进制
console.log(parseInt('111001',2));//57
console.log(parseInt('011011',2));//27
console.log(parseInt('110010',2));//50
console.log(parseInt('100000',2));//32

let str='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str+=str.toLowerCase();
str+='0123456789+/';

console.log(str[57]+str[27]+str[50]+str[32]);//5byg,将5byg经过base64解密就是张