import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import PromiseDemo from './PromiseDemo';

function setTO(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

function turnCallbackIntoPromise(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, res) => {
        if(err) {
          reject(err);
          return;
        }
             resolve(res)       
      });
    })
  }
}

function superAgentGet(url,cb) {
  return request.get(url).end(cb)
}

function doRequest(url) {
  //do promise
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      if(err) {
        reject(err);
        return;
      }
           resolve(res)       
    });
  })
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      message: 'hello, happy 4th'
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({message: 'happy 5th'})
    // }, 1000)
    setTO(1000).then(() => {
      this.setState({ message: 'happy 5th' })
    })
//     doRequest('https://swapi.co/api/people/1').then( response => {
//     this.setState({ message: 'The data from swappi is: ' + response.body.name })
// }).catch(error => {
//   this.setState({ message: 'Got an error: ' + error.message })
// })

const superAgentGetWithPromise = turnCallbackIntoPromise(superAgentGet);
superAgentGetWithPromise('https://swapi.co/api/people/1').then(response => {
  this.setState({ message: 'The data from swapi is: ' + response.body.name})
}).catch( error => {
  this.setState({ message: 'Got an error: ' + error.message })
})
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
        <div>{this.state.message}</div>
        <PromiseDemo />
      </div>
    );
  }
}

export default App;


// function doRequest(url) {
//   //do promise
//   return new Promise((resolve, reject) => {
//     request.get(resolve,url).end((err, res) => {
//       console.log(err,res) 
                  
//     });
//   })
// }

// doRequest('http://swapi.co/api/people/1').then( response => {
//   console.log('--------- response', response.data);
// })