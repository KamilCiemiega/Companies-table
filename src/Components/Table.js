import React, { Component } from 'react';
import getDataFromApi from '../Api/getDataFromApi';

class Table extends Component {
    state = {
        perPage: 0,
        list:'',
        data: []
    }

    componentDidMount() {
        Promise.then((value) => {
            console.log(value)
            // this.setState({data:getDataFromApi()})
        })
    }

    

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value  
        })
    };

    renderFilteredList = async () => {
        const filteredList = await this.props.data.filter(
            elem =>
                elem.toLowerCase().indexOf(this.state.list.toLowerCase()) > -1
        );
        if(this.state.list.length === 0) {
            return null;
        }
        console.log(filteredList)
        return (
            filteredList.slice(this.state.perPage).map(elem => {
                return (
                    <tr>
                        <td>{elem.show.name}</td>
                        <td>{elem.show.type}</td>
                        <td>{elem.show.language}</td>
                        <td>{elem.show.genres.map(item => <span>{item}</span>)}</td>
                        <td>{elem.show.runtime}</td>
                        <td>{elem.show.status}</td>
                    </tr>
                );
            })
        );
    }


    mapData = () => {
        let list = this.props.data.slice(this.state.perPage).map(elem => {
            return (
                <tr>
                    <td>{elem.show.name}</td>
                    <td>{elem.show.type}</td>
                    <td>{elem.show.language}</td>
                    <td>{elem.show.genres.map(item => <span>{item}</span>)}</td>
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
                        {/* {this.renderFilteredList()} */}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;