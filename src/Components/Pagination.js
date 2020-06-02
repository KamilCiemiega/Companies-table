import React, { Component } from 'react';

export default class Pagination extends Component {

    state = {
        currentPage: 1
    }

    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }
    renderTodos = () => {
        // console.log(this.props.filtredAndSortedList)
        
    }
    render(){
        

        return(
            <div className="container">
                <i className="fas fa-step-forward"></i>
                {/* {renderTodos} */}
                {this.renderTodos()}
                <i className="fas fa-caret-right"></i>
            </div>
        );
    }
}