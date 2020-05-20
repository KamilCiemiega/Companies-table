import React, { Component } from 'react';

export default class Pagination extends Component {

    state = {
        currentPage: 1,
        todosPerPage: 3
    }

    render(){
        return(
            <div className="container">
                <i class="fas fa-step-forward"></i>
                <i class="fas fa-caret-right"></i>
            </div>
        );
    }
}