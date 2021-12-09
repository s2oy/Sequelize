import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      host: 'seoyeon',
      test: '',
    }
  }

  //api 받아오기
  componentDidMount() {
    this._addData();
  }

_addData = async(e) => {
  console.log(await axios('/add/data', {
    method: 'POST',
    data: { 'test' : 'Complate!' },
    headers: new Headers()
  }))
}

  render() {
    return (
      <div className='App'>
        <h3>
          Welcome to <u> {this.state.host} </u> Blog!
        </h3>
      </div>
    );
  }
}

export default App;
