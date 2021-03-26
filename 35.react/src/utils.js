/*
 * @Author: dfh
 * @Date: 2021-03-24 07:55:00
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 07:56:21
 * @Modified By: dfh
 * @FilePath: /35.react/src/utils.js
 */
import { REACT_TEXT } from './constants';
export function wrapToVdom(element) {
    return (typeof element === 'string' || typeof element === 'number') ?
        { type: REACT_TEXT, props: { content: element } } : element
}