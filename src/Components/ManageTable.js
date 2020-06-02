import React, { Component } from 'react';
import { sortTypes } from '../helpers/sortTypes';
import Pagination from './Pagination';
export default class ManageTable extends Component {

    state = {
        showArrow: 1,
        sortedFieldValue: '',
        direction: '',
        currentSort: 'default',
        filtredAndSortedList: []
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
        console.log(filtredAndSortedList)
        return filtredAndSortedList;
    }

    render() {

        return (
            <>
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
                        {this.renderFilteredAndSortedList().slice(this.props.perPage).map(elem => {
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
                <Pagination filtredAndSortedList={this.renderFilteredAndSortedList} />
            </>
        );
    }
}