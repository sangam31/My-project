import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
//import bookStore from './bookStore'
import Home from './home'

class BooksApp extends React.Component {
  state = {
    bookss : [],
    bookSearch: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    

  }

  componentDidMount() {
    BooksAPI.getAll().then((bookss) => {
      this.setState(() => ({
        bookss
      }))
    })
  }
  emptybooks = () => this.setState({bookSearch : [] })

  /*search = (query) => {
    if(query.length !== 0) {
      BooksAPI.search(query).then(bookSearch => {
        const searchResult = [];
          for (const searchedBook of bookSearch) {
            for(const book of this.state.bookss) {
              if(searchedBook.id === book.id) {
                searchedBook.shelf = book.shelf
              }
            }
            searchResult.push(searchedBook)
          
  }*/

  SearchQuery = (event) => {
    const query = event.target.value
    if (query !== '') {
      BooksAPI.search(query).then(searchResults => {
        if(!searchResults || searchResults.error) {
          this.setState({bookSearch:[] })
          return
        }
        const aBooks = searchResults.map(searchResult => {
          this.state.bookss.forEach(book => {
            if (book.id === searchResult.id) searchResult.shelf = book.shelf
          })
          return searchResult
        })
        this.setState({bookSearch: aBooks})
      })
    }else {
      this.setState({bookSearch:[] })
    }
  }

  ShelfUpdate = (book, shelf) => {
    if(shelf==='none') {
      this.setState(prevState => ({
        bookss: prevState.bookss.filter(c => c.id !== book.id),
      }))
    }
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        const {bookss, bookSearch}=this.state
        const bookssIds = bookss.map(c => c.id)
        const bookSearchIds =bookss.map(c => c.id)
        let newBooks = []
        let searchNewBooks = []

        if(bookssIds.includes(book.id) || bookSearchIds.includes(book.id)) {
          newBooks=bookss.map(c => c.id === book.id ? { ...c, shelf} : c)
          searchNewBooks=bookSearch.map(c => c.id === book.id ? {...c, shelf} : c)
        }else {
          book.shelf = shelf
          newBooks = [...bookss ,book]
          searchNewBooks = [...bookSearch, book]
        }
        this.setState({ bookss: newBooks, bookSearch: searchNewBooks })
      })
    }
  }
  

  render() {

  /*const { books } = this.props;
    const currentlyReading = bookss.filter( book => book.shelf === "currentlyReading");
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");
*/

//Routing..
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Home ShelfUpdate = {this.ShelfUpdate} books={this.state.bookss} /> 
        )} />

        <Route exact path='/search' render={() => (
          <SearchBook emptybooks={this.emptybooks} SearchQuery={this.SearchQuery} ShelfUpdate={this.ShelfUpdate} books={this.state.bookSearch} />
        )}/>
      
      </div>
      
    )
  }
}

export default BooksApp
