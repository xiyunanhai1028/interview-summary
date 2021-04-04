/*
 * @Author: dfh
 * @Date: 2021-03-30 07:11:45
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:13:16
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/react-router/Lifecycle.js
 */
import React from 'react';

class Lifecycle extends React.Component{
     componentDidMount(){
        this.props.onMount&&this.props.onMount();
     }
     componentWillUnmount(){
        this.props.unMount&&this.props.unMount();
     }
     render(){
         return null;
     }
}
export default Lifecycle;