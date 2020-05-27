import React, { Component } from 'react';
import './scss/main.scss'
import Table from './Components/Table';

class App extends Component {


  render() {
    return(
      <div className="container">
          <Table/>
      </div>
    );
  }
}

export default App;
