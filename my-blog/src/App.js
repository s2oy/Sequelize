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

  //쿼리로 접근할 수 있는 api를 axios를 통해 요청
  componentDidMount() {
    this._dbTest();
  }

_dbTest = async() => {
  const res = await axios.get('/api/test');
  console.log(res.data);
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
