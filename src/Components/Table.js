import React, { Component } from 'react';

class Table extends Component {


    mapData = () => {
        const list = this.props.data.map(elem => {
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
                        placeholder="Search...">
                    </input>
                    <div className="select-style">
                        <p>Results per page</p>
                        <select>
                            <option value={5}>5</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;