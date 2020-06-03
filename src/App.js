import React, { Component } from 'react';
import './scss/main.scss';
import getDataFromApi from './Api/getDataFromApi';
import ManageTable from './Components/ManageTable';


class App extends Component {
  state = {
    searchValue: '',
    data: []
  }

  componentDidMount() {
    getDataFromApi().then((value) => {
      this.setState({ data: value })
    })
  }

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    })
  };


  render() {

    return (
      <div className="container">
        <form>
          <input
            type="search"
            placeholder="Search..."
            value={this.state.searchValue}
            onChange={this.handleChange}
            name="searchValue">
          </input>
        </form>
        <ManageTable 
          movieData={this.state.data} 
          searchValue={this.state.searchValue} 
          perPage={this.state.perPage}/>
      </div>
    );
  }
}

export default App;
