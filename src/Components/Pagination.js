import React, { Component } from 'react';

const pagination = (props) => {

        return(
            <div className="container">
                <ul className="container-numbers">
                    {Number(props.perPage) !== 10 && props.filtredAndSortedList.length !== 1 ?
                        props.renderPageNumbers.map(number => {
                            return(
                                <li className={`paginaion-button-${props.currentPage === number ? 'selected' : ''}`}
                                    key={number}
                                    id={number}
                                    onClick={props.handleClick}>
                                        {number}
                                </li>
                            );
                        }): null
                    }
                </ul>
            </div>
        );
}

export default pagination;