import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  increment = () => {
    this.setState((prevState) => {
      return {counter: prevState.counter + 1 }
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.increment(this.state.counter)}>Increment</button>
        {this.state.counter}
      </div>
    );
  }
}

export default App;
