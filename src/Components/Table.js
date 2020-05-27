import React, { Component } from 'react';
import getDataFromApi from '../Api/getDataFromApi';

class Table extends Component {
    state = {
        perPage: 0,
        list:'',
        data: []
    }

    componentDidMount() {
        getDataFromApi().then((value) => {
            this.setState({data:value})
        })        
    }

    

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value  
        })
    };

     renderFilteredList = () => {
         const { data } = this.state
        //  const arr = [
        //      'asd',
        //      'fgh'
        //  ]
        const arr = []
        if(data.length > 0){
            data.forEach(elem => {
                arr.push(elem.show.name)
            });
            // for(let key in data){
            //     console.log(data[key].show.name)
            
            // }
                const filteredList = arr.filter(
                    elem =>
                  elem.toLowerCase().indexOf(this.state.list.toLowerCase()) > -1
              );
              console.log(filteredList)
        }
        console.log(data)
        // const regex = new RegExp(`^${this.state.list}`,'i');
        // if(this.state.data.length > 0){
        //     let filteredList = arr.sort().filter(v => v.test(regex))
        //     console.log(filteredList)
        // }
        
        
        // console.log(filteredList)
        // return (
        //     filteredList.slice(this.state.perPage).map(elem => {
        //         return (
        //             <tr>
        //                 <td>{elem.show.name}</td>
        //                 <td>{elem.show.type}</td>
        //                 <td>{elem.show.language}</td>
        //                 <td>{elem.show.genres.map(item => <span>{item}</span>)}</td>
        //                 <td>{elem.show.runtime}</td>
        //                 <td>{elem.show.status}</td>
        //             </tr>
        //         );
        //     })
        // );
    }


    mapData = () => {
        let list = this.state.data.slice(this.state.perPage).map(elem => {
            return (
                <tr key={elem.show.id}>
                    <td>{elem.show.name}</td>
                    <td>{elem.show.type}</td>
                    <td>{elem.show.language}</td>
                    <td>{elem.show.genres.map((item,i) => <span key={i}>{item}</span>)}</td>
                    <td>{elem.show.runtime}</td>
                    <td>{elem.show.status}</td>
                </tr>
            );
        })
        return list;
    }

    render() {

        return (
            <div className="container">
                <form>
                    <input
                        type="search"
                        placeholder="Search..." 
                        value={this.state.list}
                        onChange={this.handleChange}
                        name="list">
                    </input>
                    <div className="select-style">
                        <p>Results per page</p>
                        <select
                            value={this.state.perPage}
                            name="perPage"
                            onChange={this.handleChange}>
                            <option value={5}>5</option>
                            <option value={2}>8</option>
                            <option value={0}>10</option>
                        </select>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Language</th>
                            <th>Genre(s)</th>
                            <th>Runtime</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mapData()}
                        {this.renderFilteredList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;