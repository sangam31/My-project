import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import BookStore from './bookStore'
//import BooksApp from './App'


class SearchBook extends Component {

  componentWillMount() {
    this.props.emptybooks()
  }
    render () {
        //const { search } = this.props;
        return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search"
               to='/'>
                   close
               </Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                    value={this.props.books.string}
                    onChange={this.props.SearchQuery}
                    placeholder="Search by title or author"
                   />

              </div>
            </div>
            <div className="search-books-results">
              
                  <BookStore ShelfUpdate={this.props.ShelfUpdate} 
                    shelf='Search Results' books={this.props.books} />
              

            </div>
        </div>
        )
    }
}

export default SearchBook