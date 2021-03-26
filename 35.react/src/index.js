/*
 * @Author: dfh
 * @Date: 2021-03-17 15:22:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-24 09:15:24
 * @Modified By: dfh
 * @FilePath: /35.react/src/index.js
 */
import React from './react';
import ReactDOM from './react-dom';

// const el = React.createElement('div', {
//     id: 'title',
//     style: {
//         background: 'red',
//         color: 'white'
//     }
// }, React.createElement('span', null, 'hello'), 'world')

// function FunComponent(props) {
//     return <div className='title' style={{ background: 'red', color: 'white' }}>
//         <span>{props.name}</span>
//         {props.children}
//     </div>
// }

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { num: 0 }
    }

    addHandler = () => {
        // const { num } = this.state;
        // this.setState({ num: num + 2 })
        //批量更新
        this.setState({ num: this.state.num + 1 });
        console.log(this.state.num);

        this.setState({ num: this.state.num + 1 });
        console.log(this.state.num);

        //已经不归react管
        Promise.resolve().then(() => {
            console.log(this.state.num);

            this.setState({ num: this.state.num + 1 });
            console.log(this.state.num);

            this.setState({ num: this.state.num + 1 });
            console.log(this.state.num);

        })

    }

    render() {
        return <div>
            <p>{this.props.name}:{this.state.num}</p>
            <button onClick={this.addHandler}>+2</button>
        </div>
    }
}
ReactDOM.render(<Counter name='张三' />, document.getElementById('root'));