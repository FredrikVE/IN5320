import React from "react";
import './App.css';

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  changeCount(amount) {
    this.setState(prevState => {
      return { count: prevState.count + amount }
    })
  }

  resetCount() {
    this.setState({ count: 0 })
  }

  render() {
    return (
      <div className="app-container" >
        <div className="counter-row">
          <button id="increase-btn" onClick={() => this.changeCount(1)}>+</button>
          <span id="counter-value">{this.state.count}</span>
          <button id="decrease-btn" onClick={() => this.changeCount(-1)}>-</button>
        </div>
        
        <button className="reset-btn" onClick={() => this.resetCount()}>Reset</button>
      </div>
    )
  }
}

export default Counter;