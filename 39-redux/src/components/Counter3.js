/*
 * @Author: dfh
 * @Date: 2021-03-23 06:42:06
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-23 06:42:06
 * @Modified By: dfh
 * @FilePath: /39-redux/src/components/Counter3.js
 */
import React from 'react';
import { connect } from '../react-redux'
import actions from '../store/actions/counter3'
class Counter3 extends React.Component {
    render() {
        const { num, asyncAdd, pMinus } = this.props;
        return <div>
            <p>{num}</p>
            <button onClick={asyncAdd}>asyncAdd</button>
            <button onClick={pMinus}>promise minus</button>
        </div>
    }
}

const mapStateToProps = state => state.Counter3;
export default connect(mapStateToProps, actions)(Counter3);
