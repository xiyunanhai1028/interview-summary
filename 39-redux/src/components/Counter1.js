import React from 'react'
import { useSelector, useDispatch } from '../react-redux'

function Counter1() {
    const state = useSelector(state => state.Counter1);
    const dispatch = useDispatch();
    return <div>
        <p>{state.num}</p>
        <button onClick={() => dispatch({ type: 'ADD1' })}>+</button>
        <button onClick={() => dispatch({ type: 'MINUS1' })}>-</button>
    </div>
}
export default Counter1;

