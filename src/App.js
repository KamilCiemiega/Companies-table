import React, { Component } from 'react';
import './scss/main.scss'
import axios from 'axios';
import Table from './Components/Table';
import Spinner from './Components/Spinner';

class App extends Component {

  state={
    data:[],
    loading:false
  }

  componentDidMount() {
      axios.get("https://api.tvmaze.com/search/shows?q=snow")
      Promise.then(resp => {
        this.setState({data:resp.data})
      })
      .catch(err => {
        this.setState({loading:false})
        throw new Error('Something went wrong')
      })
  }

  render() {
    return(
      <div className="container">
        {this.state.loading ? <Spinner /> :
          <Table data={this.state.data}/>
        }
      </div>
    );
  }
}

export default App;
