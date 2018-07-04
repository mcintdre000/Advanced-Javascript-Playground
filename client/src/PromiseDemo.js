import React, { Component } from 'react';
import request from 'superagent';

class Wpx5Promise {
    constructor(callback) {
        this.callback = callback;
        this.callback(this.resolve, this.reject);
        this.chained = [];
        this.catches = [];
    }

    resolve = (value) => {
        let result = value
        this.chained.forEach(cb => {
        try {
            result = cb(result)
        } catch (error) {
            this.reject(error)
        }
        })
    }

    reject = (value) => {
        if (this.catches.length) {
            this.catches[0](value);
        }
    }

    then = (cb) => {
        this.chained.push((cb))
        return this;
    }

    catch = (cb) => {
        this.catches.push((cb))
        return this;
    }

    
}

function requestWithPromise(url) {
    return new Wpx5Promise((resolve, reject) => {
        request.get(url).end((err,response) => {
            if(err) {
                reject(err);
                return;
              }
                   resolve(response)       
            });
    })
}

export default class PromiseDemo extends Component {
    constructor() {
        super();
        this.state = {
            message: 'promise message will go here'
        };
    }

    componentDidMount() {
        // request.get('https://swapi.co/api/people/1').end((err,res) => {
        //     if (err) {
        //         this.setState({ message: 'Error!!!' + err})
        //         return;
        //     }
        //     this.setState({ message: response.body.name})
        // })
      const myPromise = requestWithPromise('https://swapi.co/api/people/1')
      
      myPromise.then(response => {
            this.setState({ message: response.body.name})
        }).catch(err => {
            this.setState({ message: 'Error!!!' + err})
        })
    }
    render() {
        return (
            <div>
            <h1>Promise Demo</h1>
            {this.state.message}
            </div>
        );
    }
}