import React from 'react'
import { connect } from '../react-redux';
import actions from '../store/actions/counter2';
class Counter1 extends React.Component {
    render() {
        const { num, add2, minus2 } = this.props
        return <div>
            <p>{num}</p>
            <button onClick={add2}>+</button>
            <button onClick={minus2}>-</button>
        </div>
    }
}
const mapStateToProps = state => state.Counter2;
export default connect(
    mapStateToProps,
    actions
)(Counter1);
