import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookStore from './bookStore'

class Home extends Component {
    render() {
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                <BookStore ShelfUpdate={this.props.ShelfUpdate} shelf="Currently Reading" books={this.props.books.filter(book => book.shelf === 'currentlyReading')} />,
                <BookStore ShelfUpdate={this.props.ShelfUpdate} shelf="Want to Read" books={this.props.books.filter(book => book.shelf === 'wantToRead')} />,
                <BookStore ShelfUpdate={this.props.ShelfUpdate} shelf="Read" books={this.props.books.filter(book => book.shelf === 'read')} />
            
                </div>
                <div className='open-search'>
                    <Link
                        to='/search'>
                            Add Book
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home