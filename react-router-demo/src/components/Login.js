/*
 * @Author: dfh
 * @Date: 2021-03-30 07:31:43
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-30 07:36:32
 * @Modified By: dfh
 * @FilePath: /react-router-demo/src/components/Login.js
 */
import React from 'react';

function Login(props) {
    const nameRef = React.useRef();
    const pwdRef = React.useRef();
    const handleSubmit = function (event) {
        event.preventDefault();
        const state = props.location.state;
        let to = '/';
        localStorage.setItem('login', JSON.stringify({
            userName: nameRef.current.value,
            password: pwdRef.current.value
        }));
        if (state) {
            to = state.from;
        }
        props.history.push(to);
    }
    return <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder='请输入用户名' /> <br />
        <input type="password" ref={pwdRef} placeholder='请输入密码' /> <br />
        <input type="submit" value='登陆' />
    </form>
}
export default Login;