import React, { Component } from 'react';
import './scss/main.scss';
import getDataFromApi from './Api/getDataFromApi';
import ManageTable from './Components/ManageTable';


class App extends Component {
  state = {
    perPage: 0,
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
      [e.target.name]: e.target.value
    })
  };

  changeRowsPerPage = (e) => {
    const perPage = this.state.data.slice(e.target.value)
    this.setState({ perPage })
  }


  // mapData = () => {
  //     const { currentPage } = this.state;
  //     const data = []


  //     if(this.props.data.length > 0) {

  //         const indexOfLastTodo = currentPage * this.props.data.length;
  //         const indexOfFirstTodo = indexOfLastTodo - this.props.data.length;

  //         this.props.data.forEach(element => {
  //             data.push(element.show)
  //         });
  //         const currentTodos =  data.slice(indexOfFirstTodo, indexOfLastTodo);
  //         console.log(currentTodos)
  //     //     const render = currentTodos.map((todo, index) => {
  //     //     return <li key={index}>{todo}</li>;
  //     //   });
  //     //   return render
  //     }
  //     return null
  //     if(this.state.perPage === 0) {
  //         let list = this.state.data.map(elem => {
  //             return (
  //                 <tr key={elem.show.id}>
  //                     <td>{elem.show.name}</td>
  //                     <td>{elem.show.type}</td>
  //                     <td>{elem.show.language}</td>
  //                     <td>{elem.show.genres.map((item, i) => <span key={i}>{item}</span>)}</td>
  //                     <td>{elem.show.runtime}</td>
  //                     <td>{elem.show.status}</td>
  //                 </tr>
  //             );
  //         })
  //         return list;
  //     }
  //     else {
  //         let selectedRows = this.state.perPage.map(elem => {
  //             return (
  //                 <tr key={elem.show.id}>
  //                     <td>{elem.show.name}</td>
  //                     <td>{elem.show.type}</td>
  //                     <td>{elem.show.language}</td>
  //                     <td>{elem.show.genres.map((item, i) => <span key={i}>{item}</span>)}</td>
  //                     <td>{elem.show.runtime}</td>
  //                     <td>{elem.show.status}</td>
  //                 </tr>
  //             );
  //         })
  //         return selectedRows;
  //     }


  // }

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
          <div className="select-style">
            <p>Results per page</p>
            <select
              value={this.state.perPage}
              onChange={this.changeRowsPerPage}>
              <option value={8}>2</option>
              <option value={5}>5</option>
              <option value={0}>10</option>
            </select>
          </div>
        </form>
        <ManageTable movieData={this.state.data} searchValue={this.state.searchValue} perPage={this.state.perPage} />
      </div>
    );
  }
}

export default App;
