import React, { Component } from 'react';
import { sortTypes } from '../helpers/sortTypes';
import Pagination from './Pagination';
export default class ManageTable extends Component {

    state = {
        sortedFieldValue: '',
        direction: '',
        currentSort: 'default',
        currentPage: 1,
        perPage: 10
    }

    renderSortedTable = () => {
        const sortedFieldValue = this.state.sortedFieldValue
        let sordetMovies = []
        this.props.movieData.forEach(item => {
            sordetMovies.push(item.show)
        })
        sordetMovies.sort((a, b) => {
            if (a[sortedFieldValue] < b[sortedFieldValue]) {
                return this.state.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortedFieldValue] > b[sortedFieldValue]) {
                return this.state.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        })
        return sordetMovies

    }

    requestSort = key => {
        let direction = 'ascending';
        if (this.state.sortedFieldValue === key && this.state.direction === 'ascending') {
            this.setState({
                direction: 'descending',
                currentSort: 'down'
            })
        }
        else {
            this.setState({
                sortedFieldValue: key,
                currentSort: 'up',
                direction
            })
        }
    }

    renderFilteredAndSortedList = () => {
        const filtredAndSortedList = this.renderSortedTable().filter(elem => {
            const searchingPhraseLowercase = this.props.searchValue.toLowerCase();
            if (searchingPhraseLowercase === '') {
                return true;
            }
            return (
                elem.name.toLowerCase().indexOf(searchingPhraseLowercase) > -1 ||
                elem.type.toLowerCase().indexOf(searchingPhraseLowercase) > -1 ||
                elem.language.toLowerCase().indexOf(searchingPhraseLowercase) > -1 ||
                elem.status.toLowerCase().indexOf(searchingPhraseLowercase) > -1 ||
                elem.runtime.toString().toLowerCase().indexOf(searchingPhraseLowercase) > -1 ||
                elem.genres.some(genre => genre.toLowerCase().indexOf(searchingPhraseLowercase) > -1)
            );

        })

        return filtredAndSortedList;
    }

    handleChange = e => {
        this.setState({
            perPage: e.target.value,
            currentPage: 1
        })
    };

    handleClick = (event) => {
        this.setState({ currentPage: Number(event.target.id) });
    }

    renderPageNumbers = () => {
        const { perPage } = this.state
        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(this.renderFilteredAndSortedList().length / perPage); i++) {
            pageNumber.push(i);
        }
        return pageNumber;
    }


    render() {

        const filtredAndSortedList = this.renderFilteredAndSortedList()
        const renderPageNumbers = this.renderPageNumbers()

        const indexOfLastTodo = this.state.currentPage * this.state.perPage
        const indexOfFirstTodo = indexOfLastTodo - this.state.perPage

        return (
            <>
                <div className="select-style">
                    <p>Results per page</p>
                    <select
                        name="perPage"
                        value={this.state.perPage}
                        onChange={this.handleChange}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button type='button' onClick={() => this.requestSort('name')}>
                                    Name
                            </button>
                                {this.state.sortedFieldValue === 'name' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                            <th>
                                <button type='button' onClick={() => this.requestSort('type')}>
                                    Type
                            </button>
                                {this.state.sortedFieldValue === 'type' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                            <th>
                                <button type='button' onClick={() => this.requestSort('language')}>
                                    Language
                            </button>
                                {this.state.sortedFieldValue === 'language' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                            <th>
                                <button type='button' onClick={() => this.requestSort('genres')}>
                                    Genres
                            </button>
                                {this.state.sortedFieldValue === 'genres' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                            <th>
                                <button type='button' onClick={() => this.requestSort('runtime')}>
                                    Runtime
                            </button>
                                {this.state.sortedFieldValue === 'runtime' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                            <th>
                                <button type='button' onClick={() => this.requestSort('status')}>
                                    Status
                            </button>
                                {this.state.sortedFieldValue === 'status' ?
                                    <i className={`fas fa-${sortTypes[this.state.currentSort].class}`} />
                                    : null
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtredAndSortedList.slice(indexOfFirstTodo, indexOfLastTodo).map(elem => {
                            return (
                                <tr key={elem.id}>
                                    <td>{elem.name}</td>
                                    <td>{elem.type}</td>
                                    <td>{elem.language}</td>
                                    <td>{elem.genres.map((item, i) => <span key={i}>{item}</span>)}</td>
                                    <td>{elem.runtime}</td>
                                    <td>{elem.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.currentPage}
                    perPage={this.state.perPage}
                    handleClick={this.handleClick}
                    renderPageNumbers={renderPageNumbers} 
                    filtredAndSortedList={filtredAndSortedList}/>
            </>
        );
    }
}